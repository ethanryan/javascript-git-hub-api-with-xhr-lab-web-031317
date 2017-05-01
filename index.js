// INSTRUCTIONS
// Create a form with a username field that calls a
// getRepositories function that loads the repositories div
// with a list of public repositories for that user.
// The displayed repositories should include the name and a link
// to the URL (HTML URL, not API URL).

const rootURL = "https://api.github.com" //adding this, got from solution

//////need to change 'octocat' to '$input'
  //var $input = $('input#username') //this is the username the user types in

  //got above online, refactoring below for me:
  function showInput() {
    var display = document.getElementById("display");
    var username = document.getElementById("username");
    display.innerHTML = username.value;
  }

  //form submit:
  // $("#formID").submit(function(event) {
  //     event.preventDefault(); // to stop the form from submitting
  //     /* Validations go here */
  //     showInput();
  //     getRepositories();
  //     this.submit(); // If all the validations succeeded
  // });

  // function getRepositories() {
  //   const name = document.getElementById("username").value //adding this, got from solution
  //   const uri = rootURL + "/users/" + name + "/repos" //adding this, got from solution
  //   const req = new XMLHttpRequest();
  //
  //   req.addEventListener("load", displayRepositories);
  //   //req.open("GET", `https://api.github.com/users/${$input}/repos`)
  //   req.open("GET", uri) //changing this
  //   req.send();
  //   return false; //not sure what this does
  // }

  //from solution:

  function getRepositories() {
  const name = document.getElementById("username").value
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}

  //below is from last lab:::
  // function displayRepositories(event, data) { //changing this from 'showRepositories' to 'displayRepositories'
  // var repos = JSON.parse(this.responseText)
  // console.log('repos: ', repos)
  // //const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  //
  // //from last lab::::::
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  //
  // // below line isn't a link, but it's passing the test:
  // //const repoList = `<ul>${repos.map(repo => '/https:\/\/github.com\/' + repo.full_name + '/')}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  // }

//from solution:
  function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}


  // Add a link to each repository that calls a
  // getCommits function on click and, when the
  // request is complete, calls a displayCommits
  // function that fills the details div with a
  // list of commits for that repository.
  // The display of commits should include
  // the author's Github name, the author's full name,
  // and the commit message. Give the link data attributes
  // of username and repository to be used by the getCommits function.

//from solution:
  function getCommits(el) {
    const repoName = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayCommits)
    xhr.open("GET", uri)
    xhr.send()
  }
  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  }


  // Add a link to each repository that calls a
  // getBranches function when clicked and, when complete,
  // calls a displayBranches function that fills the details div
  // with a list of names of each branch of the repository.
  // Give the link data attributes of username and repository
  // for use by the getBranches function.


//from solution:
  function getBranches(el) {
    const repoName = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayBranches)
    xhr.open("GET", uri)
    xhr.send()
  }
  function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
  }


//})
