//select the main variables

const theInput = document.querySelector(".get-repos input");
const getRepo = document.querySelector(".get-button");
const reposData = document.querySelector(".show-repo");

//  by pressing on the getrepo button the function
// will start another function which is the main function
getRepo.onclick = function () {
  // main function
  getRepos();
};
theInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getRepos();
  }
});

function getRepos() {
  //if the
  if (theInput.value == "") {
    //if input value is empty then put a text to tell the user
    reposData.innerHTML = "<span>Please Enter Github Username</span>";
  } else {
    // fetch using an api
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((repo) => {
        // turn to json
        return repo.json();
      })
      .then((repos) => {
        // once you recive a response then empty the "reposData"
        reposData.innerHTML = "";
        // theInput.value = "";
        // loop to add all the repos into the page
        repos.forEach((repo) => {
          // repos Name:-
          // creat an element
          let mainDiv = document.createElement("div");
          // put the text inside the element
          // mainDiv.appendChild(document.createTextNode(repo.name));
          let repoText = document.createElement("h2");
          repoText.appendChild(document.createTextNode(repo.name));
          // append the element into the reposData
          mainDiv.appendChild(repoText);
          reposData.appendChild(mainDiv);
          // ----------------------------------------
          // repos Url:-
          let repoUrl = document.createElement("a");
          // creat repo url
          repoUrl.appendChild(document.createTextNode("Visit repo"));
          // append the url text to anchor tag
          repoUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          // add the hypertext refrence "href"
          repoUrl.setAttribute("target", "_blank");
          // set attribute so the link open in a new tap
          mainDiv.appendChild(repoUrl);
          // append url anchor to main Div
          // ----------------------------------------
          // repo star:-
          // creat stars count span
          let repoStar = document.createElement("span");
          // append star count text to stars span
          repoStar.appendChild(
            document.createTextNode(` stars: ${repo.stargazers_count}`)
          );
          // append stars count span to main Div
          mainDiv.appendChild(repoStar);
          // ----------------------------------------
          // add class for the main div to style it better
          mainDiv.className = "repo-box";
          // ----------------------------------------
          // make the info dynamic which means any github user can it
          console.log(repo.name);
          // to style the link and the star
          let info = document.createElement("div");
          info.className = "info";
          // appende
          info.appendChild(repoUrl);
          info.appendChild(repoStar);
          mainDiv.appendChild(info);
        });
        theInput.value = "";
      })
      .catch(() => {
        // if there is no github user with the same name
        reposData.innerHTML = `<p>no user was found</p>`;
        theInput.value = "";
      });
  }
}
