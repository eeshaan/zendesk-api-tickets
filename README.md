> **NOTE**: This project was created as a part of a coding challenge for the opportunity to intern at Zendesk. As such, the API key used in the live demo will only be valid until November 18th, 2020.

# Zendesk API Tickets
A simple webapp to display tickets received from the Zendesk API in a paginated list or individually — built with Next.js and Sematic UI.

## Getting Started
### 🔨 Building
<details open>
  <summary>System Requirements</summary>
  
  - [Git](https://git-scm.com/downloads)
  - [Node.js](https://nodejs.org)
</details>

1. Clone this repository.
```sh
$ git clone https://github.com/eeshaan/zendesk-api-tickets
```
2. Collect and install packages.
```sh
$ npm i
```

### 🔐 Authenticating
``` sh
$ npm run authenticate # places credentials in .env.local
```
Alternatively, the `.env.local` file can be editted manually.  
To prevent storing your password in plain text, the preffered method of authentication is with an API token, which can be created at https://{YOUR_SUBDOMAIN}.zendesk.com/agent/admin/api/settings

### 🏃‍♂️ Running
```sh
$ npm start
```
Alternatively, to run while watching for changes use
``` sh
$ npm run dev
```

### 🚀 Deploying
This repository is ready to be deployed with [Vercel](https://vercel.com). Simply use this repository's URL and add the environment variables.
