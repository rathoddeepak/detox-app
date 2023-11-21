package com.installedapplication;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.ResolveInfo;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.provider.Settings;
import android.graphics.drawable.Drawable;
import android.app.usage.UsageStatsManager;
import android.app.usage.UsageStats;
import android.app.AppOpsManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.File;

import javax.annotation.Nullable;

import com.helper.*;

public class RNInstalledApplicationModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private Map<String, UsageStats> lUsageStatsMap;

  public RNInstalledApplicationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNInstalledApplication";
  }

  @ReactMethod
  public void getApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      WritableArray list = Arguments.createArray();
      for (int i = 0; i < pList.size(); i++) {
        PackageInfo packageInfo = pList.get(i);
        WritableMap appInfo = Arguments.createMap();

        appInfo.putString("packageName", packageInfo.packageName);
        appInfo.putString("versionName", packageInfo.versionName);
        appInfo.putDouble("versionCode", packageInfo.versionCode);
        appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
        appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
        appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

        Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
        appInfo.putString("icon", Utility.convert(icon));

        String apkDir = packageInfo.applicationInfo.publicSourceDir;
        appInfo.putString("apkDir", apkDir);

        File file = new File(apkDir);
        double size = file.length();
        appInfo.putDouble("size", size);

        list.pushMap(appInfo);
      }
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  public void getNonSystemApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      
      Intent intent = new Intent(Intent.ACTION_MAIN, null);
      intent.addCategory(Intent.CATEGORY_LAUNCHER);
      List<ResolveInfo> pList = pm.queryIntentActivities(intent, PackageManager.GET_META_DATA);

      WritableArray list = Arguments.createArray();
      for (ResolveInfo resolveInfo : pList) {
        ApplicationInfo packageInfo = resolveInfo.activityInfo.applicationInfo;
        WritableMap appInfo = Arguments.createMap();        
        Drawable icon = pm.getApplicationIcon(packageInfo);
        appInfo.putString("icon", Utility.convert(icon));
        appInfo.putString("packageName", packageInfo.packageName);
        appInfo.putString("appName", ((String) packageInfo.loadLabel(pm)).trim());
        list.pushMap(appInfo);
      }      
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  public void getSystemApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      WritableArray list = Arguments.createArray();
      for (int i = 0; i < pList.size(); i++) {
        PackageInfo packageInfo = pList.get(i);
        WritableMap appInfo = Arguments.createMap();

        if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0) {
          appInfo.putString("packageName", packageInfo.packageName);
          appInfo.putString("versionName", packageInfo.versionName);
          appInfo.putDouble("versionCode", packageInfo.versionCode);
          appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
          appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
          appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

          Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
          appInfo.putString("icon", Utility.convert(icon));

          String apkDir = packageInfo.applicationInfo.publicSourceDir;
          appInfo.putString("apkDir", apkDir);

          File file = new File(apkDir);
          double size = file.length();
          appInfo.putDouble("size", size);

          list.pushMap(appInfo);
        }
      }
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  private boolean isPackageInstalled(String packageName) {
    PackageManager pm = this.reactContext.getPackageManager();
    try {
      pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @ReactMethod
  public void startAppByPackageName(String packageName, final Promise promise) {
      if (packageName != null) {
          Intent launchIntent = this.reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
          if (launchIntent != null) {
              getReactApplicationContext().startActivity(launchIntent);
              promise.resolve(true);
              return;
          } else {
              promise.reject("could not start app");
              return;
          }
      }
      promise.reject("package name missing");
  }

  @ReactMethod
  public void hasAppUsagePermission(final Promise promise) {
    AppOpsManager appOps = (AppOpsManager) getReactApplicationContext().getSystemService(this.reactContext.APP_OPS_SERVICE);      
    if (appOps != null) {
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), getReactApplicationContext().getPackageName());
        if (mode == AppOpsManager.MODE_ALLOWED) {
            promise.resolve(true);
            return;
        } else {
            promise.resolve(false);
            return;
        }
    }
    promise.resolve(false);
  }

  @ReactMethod
  public void getAppUsagePermission(final Promise promise) {
    try {
      Intent getpermission = new Intent();
      getpermission.setAction(Settings.ACTION_USAGE_ACCESS_SETTINGS);
      this.reactContext.getCurrentActivity().startActivity(getpermission);
      promise.resolve(true);
      return;
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void initUsageStats(Double startMillis, Double endMillis, Promise promise) {
    try {
      UsageStatsManager mUsageStatsManager = (UsageStatsManager) getReactApplicationContext().getSystemService(reactContext.USAGE_STATS_SERVICE);
      this.lUsageStatsMap = mUsageStatsManager.queryAndAggregateUsageStats(Math.round(startMillis), Math.round(endMillis));
      promise.resolve(true);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  public void getUsageStatus(String packageName, final Promise promise) {
    try {
      UsageStats appData = this.lUsageStatsMap.get(packageName);
      if(appData == null){
        promise.reject("App Not Found: " + packageName);
        return;
      }
      long totalTimeUsageInMillis = appData.getTotalTimeInForeground();
      promise.resolve(new Long(totalTimeUsageInMillis).doubleValue());
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void hideNotificationTray(final Promise promise) {
    try {
      Intent closeIntent = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
      this.reactContext.sendBroadcast(closeIntent);
      String actionText = "Completed";
      promise.resolve(actionText);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void turnOff(final Promise promise) {
    try {      
      Intent intent = new Intent("android.intent.action.ACTION_REQUEST_SHUTDOWN");                
      intent.putExtra("android.intent.extra.KEY_CONFIRM", false);
      intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      this.reactContext.startActivity(intent);
      promise.resolve(true);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}