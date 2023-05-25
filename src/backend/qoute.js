const perform = details => {
  return fetch('https://api.quotable.io/quotes/random?tags=motivational')
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

const get = () => {
  return perform();
};


const QuoteBackend = {
  get
};

export default QuoteBackend;
