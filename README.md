# Detailed GitHub Repos Searcher

A lightweight, client-side web application that fetches and displays detailed information about a GitHub user's public repositories.

## Features

- **Username Search:** Fetches up to 100 public repositories for any GitHub user.
- **Language Filtering:** Filter repositories by programming language (Python, JavaScript, C++, etc.).
- **Fork Filtering:** View only original repos, only forks, or both.
- **Sorting:** Order results by Stars or Watchers (high to low).
- **Detailed Cards:** View description, size, fork count, creation date, and last push date for each repo.

## Tech Stack

- **HTML5**
- **CSS3** (Custom Properties, Flexbox, Grid)
- **Vanilla JavaScript** (Fetch API, Async/Await)
- **GitHub REST API** (Unauthenticated, 60 requests/hour limit)

## How to Use

1. Go to the [Live Demo](#) or open `index.html` in your browser.
2. Enter a GitHub username in the search bar.
3. Use the dropdown menus to filter by Language, Fork status, or Order.
4. Click "Search" to load the repository cards.

## Local Setup

No build tools or installation required. It runs entirely in the browser.

bash
# 1. Clone the repository
git clone https://github.com/oqaili1/whosgit

# 2. Open the file in your browser
# Simply double-click index.html, or use a local server:
npx serve .


## Notes

- This tool uses the unauthenticated GitHub API, which is limited to 60 requests per hour per IP address. If you see an API error, wait a few minutes before trying again.
- Only public repositories are displayed.