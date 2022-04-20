// VARS AND REFS

const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

// FUNCTIONS

const getUserRepos = function(user) {
    // format the github api url
    let apiUrl = `https://api.github.com/users/${user}/repos`;
    
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }       
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
};

const displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if (repos.length ===0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    for (let i = 0; i < repos.length; i++) {
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;
        // get count of issues
        let issueCount = repos[i].open_issues_count;
        
        // create a container for each repo
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        // create a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        
        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
 
        // check if current repo has issues or not
        if (issueCount > 0) {
            statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i>${issueCount} issue(s)`;
        } else {
            statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`;
        }

        // append to container
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

const formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    let username = nameInputEl.value.trim();
    
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

// EVENT LISTENERS
userFormEl.addEventListener("submit", formSubmitHandler);