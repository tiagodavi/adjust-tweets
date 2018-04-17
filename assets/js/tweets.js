import axios from "axios";

const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const getTweets = (term="") => {

  term = "" + term;

  if(term !="" &&
     term != undefined &&
     term.length > 2) {

      term = term.replace(/#/g, '%23');

      return axios.get(`http://localhost:4000/tweets/${term}`)
      .then(function (response) {
        return response.data.tweets;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  }

  return Promise.resolve([]);
};

const start = () => {

  const message = document.getElementById("message");
  const results = document.getElementById("results");

  document.getElementById("getTweets")
  .addEventListener("input", debounce(function(){

      if(this.value != "" &&
         this.value != undefined) {

         getTweets(this.value).then((response) => {

           const total  = response.length;
           const tweets = response.map((tweet) => `<li class="list-group-item">${tweet}</li>`);

           if(total > 0) {
             message.innerHTML = `Results for <b>${this.value}</b>:`;
             results.innerHTML = tweets.join("");
           }
           else {
             message.innerHTML = "";
             results.innerHTML = `<li class="list-group-item">There are no results for ${this.value}.</li>`;
           }

         });

      }else{
         message.innerHTML = "";
         results.innerHTML = "";
      }
  }, 500));

};

export default { start, getTweets };
