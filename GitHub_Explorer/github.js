
function fetchGitHubUser(username) {
    return new Promise((resolve, reject) => {
        // Make API request to fetch user details
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Sorry, Failed to fetch this username  ${response.statusText}`);
                }
            })
            .then(data => resolve(data))
            .catch((error) => {
                resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    });
}

// Display GitHub user details in the result container
function displayUserDetails(user) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `
    <h2>${user.name}</h2>
    <p>Repositories: ${user.public_repos}</p>
    <p>Followers: ${user.followers}</p>
    <p>Following: ${user.following}</p>
    <a href="${user.html_url}" target="_blank">View Profile</a>
  `;
}

// Fetch button click event handler
document.getElementById('fetchButton').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        fetchGitHubUser(username)
            .then(user => displayUserDetails(user))
            .catch(error => console.error(error));
    }
});


const fetchButton = document.getElementById("fetchButton");
const usernameInput = document.getElementById("usernameInput");
const resultContainer = document.getElementById("resultContainer");

fetchButton.addEventListener("click", () => {
    const username = usernameInput.value;
    if (username === "") {
        resultContainer.innerHTML = "<p>Please enter a GitHub username.</p>";
        return;
    }
    resultContainer.innerHTML = "<p>Loading...</p>";
});