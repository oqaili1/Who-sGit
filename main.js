let user = document.getElementById("srch");
let btn = document.getElementById("btn");

let allRepos = [];
let lastUsername = "";
let isFetching = false;

async function getRepos(username) {
    let lnk = `https://api.github.com/users/${username}/repos`;
    try {
        let data = await fetch(lnk);
        
        if (!data.ok) {
            if (data.status === 404) return {error: "not_found"};
            return {error: "api_error"};
        }

        let repos = await data.json();
        return repos;
    } catch (err) {
        return { error: "api_error" };
    }
}

btn.onclick = async function () {
    if (isFetching) return;

    document.getElementById("msg-area").innerHTML = "";
    document.getElementById("cards-area").innerHTML = "";

    let currentUsername = user.value.trim();

    if (!currentUsername) {
        let div = document.createElement("div");
        div.innerText = "Please enter a username.";
        div.style.cssText = "color: white;";
        document.getElementById("msg-area").appendChild(div);
        return;
    }

    if (currentUsername !== lastUsername) {
        isFetching = true; 
        btn.disabled = true;

        let result = await getRepos(currentUsername);

        isFetching = false;
        btn.disabled = false;

        if (result.error) {
            let div = document.createElement("div");
            if (result.error === "not_found") {
                div.innerText = `No account found with username "${currentUsername}"!`;
            } else {
                div.innerText = `API error or rate limit hit. Please wait a minute and try again.`;
            }
            div.style.cssText = "color: white;";
            document.getElementById("msg-area").appendChild(div);
            allRepos = [];
            lastUsername = "";
            return;
        }

        allRepos = result;
        lastUsername = currentUsername;
    }

    let langFilter = document.getElementById("lang-select").value;
    let forkFilter = document.getElementById("fork-select").value;

    let repos = allRepos.filter(repo => {
        return (repo.language === langFilter || langFilter === "All") &&
            ((repo.fork === true && forkFilter === "Yes") ||
            (repo.fork === false && forkFilter === "No") ||
            forkFilter === "All");
    });

    let order = document.getElementById("order-select").value;
    if (order === "stars") {
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (order === "watchers") {
        repos.sort((a, b) => b.watchers_count - a.watchers_count);
    }

    if (allRepos.length === 0) {
        let div = document.createElement("div");
        div.innerText = `${currentUsername} has no public repos!`;
        div.style.cssText = "color: white;";
        document.getElementById("msg-area").appendChild(div);
    } 
    else if (repos.length === 0) {
        let div = document.createElement("div");
        div.innerText = `${currentUsername} has repos, but none match the selected filters.`;
        div.style.cssText = "color: white;";
        document.getElementById("msg-area").appendChild(div);
    }
    else {
        for (let i = 0; i < repos.length; ++i) {
            let card = document.createElement("div");
            card.className = "card";
    
            let name = document.createElement("div");
            name.className = "name";
            let txtName = document.createTextNode(`Repo Name: ${repos[i].name}`);
            name.appendChild(txtName);
            card.appendChild(name);
            
            let url = document.createElement("a");
            url.href = `${repos[i].html_url}`;
            url.innerText = "Repo Link";
            card.appendChild(url);
            
            let desc = document.createElement("div");
            desc.innerText = `Description: ${repos[i].description || "No description provided"}`;
            card.appendChild(desc);
            
            let lang = document.createElement("div");
            lang.innerText = `Language: ${repos[i].language || "Not specified"}`;
            card.appendChild(lang);
            
            let size = document.createElement("div");
            size.innerText = `Size in KB: ${repos[i].size}`;
            card.appendChild(size);
            
            let stars = document.createElement("div");
            stars.innerText = `Stars: ${repos[i].stargazers_count}`;
            card.appendChild(stars);

            let watchers = document.createElement("div");
            watchers.innerText = `Number of Watchers: ${repos[i].watchers_count}`;
            card.appendChild(watchers);
            
            let allowForks = document.createElement("div");
            allowForks.innerText = `Allow forks: ${repos[i].allow_forking}`;
            card.appendChild(allowForks);
            
            let forks = document.createElement("div");
            forks.innerText = `Forks count: ${repos[i].forks_count}`;
            card.appendChild(forks);
            
            let createdAt = document.createElement("div");
            createdAt.innerText = `Created at: ${repos[i].created_at}`;
            card.appendChild(createdAt);
            
            let pushedAt = document.createElement("div");
            pushedAt.innerText = `Pushed at: ${repos[i].pushed_at}`;
            card.appendChild(pushedAt);

            card.style.cssText = `
            background-color: #2b2141;
            border: 0.5px solid #3a2a5e;
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            margin-top: 15px;
            `;
            
            let cont = document.getElementById("cards-area");
            cont.appendChild(card);
        }
    }
};