const perform = details => {
  return fetch('https://leetcode.com/graphql/', {
    method: 'POST',
    timeout: 4000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  })
    .then((response) => response.json())
    // .then(response => response.text())
    .then(res => {
      // console.log(res);
      // return JSON.parse(res);
      return res;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};
const username = 'rathoddeepak537';
const getUserStats = () => {
  const data = {
    query:
      ' query userProblemsSolved($username: String!) { allQuestionsCount { difficulty count } matchedUser(username: $username) { problemsSolvedBeatsStats { difficulty percentage } submitStatsGlobal { acSubmissionNum { difficulty count } } } } ',
    variables: {
      username,
    },
    operationName: 'userProblemsSolved',
  };
  return perform(data);
};

const getUserCalendar = () => {
  const data = {
    query:
      ' query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { activeYears streak totalActiveDays dccBadges { timestamp badge { name icon } } submissionCalendar } } } ',
    variables: {
      username,
    },
    operationName: 'userProfileCalendar',
  };
  return perform(data);
};

const getRecentSubmissions = () => {
  const data = {
    query:
      ' query recentAcSubmissions($username: String!, $limit: Int!) { recentAcSubmissionList(username: $username, limit: $limit) { id title titleSlug timestamp } } ',
    variables: {
      username,
      limit: 15,
    },
    operationName: 'recentAcSubmissions',
  };
  return perform(data);
};

const LeetCode = {
  getUserStats,
  getUserCalendar,
  getRecentSubmissions,
};

export default LeetCode;
