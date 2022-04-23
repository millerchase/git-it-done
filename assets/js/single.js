let issuesContainerEl = document.querySelector("#issues-container");

const displayIssues = function (issues) {
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on gitub   
        let issueEl = document.createElement("a");
        
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank"); 
        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);
        // create type element
        let typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issueEl);
    }
};

const getRepoIssues = function(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues`;
    
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            })
        } else {
            alert("There was a problem with your request!");
        }
    });
};

getRepoIssues("facebook/react");