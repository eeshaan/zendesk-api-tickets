> **NOTE**: This project was created as a part of a coding challenge for the opportunity to intern at Zendesk. As such, the API key used in the live demo will only be valid until November 18th, 2020.

# Zendesk API Tickets
A simple webapp to display tickets received from the Zendesk API in a paginated list or individually — built with Next.js and Semantic UI.

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
To prevent storing your password in plain text, the preferred method of authentication is with an API token, which can be created at https://{YOUR_SUBDOMAIN}.zendesk.com/agent/admin/api/settings

### 🏃‍♂️ Running
```sh
$ npm start
```
Alternatively, to run while watching for changes use
``` sh
$ npm run dev
```

### 🚀 Deploying
This repository is ready to be deployed with [Vercel](https://vercel.com). Just add your authentication environment variables.
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/eeshaan/zendesk-api-tickets)  

View the example at [https://zendesk-api-tickets.vercel.app](https://zendesk-api-tickets.vercel.app)

## Reflection
### Challenges
#### Choosing a stack
My first instinct was to use React because of its robust state management through hooks. Facebook's [Create React App](https://create-react-app.dev/) made things simple initially; however, I quickly ran into problems when trying to circumvent the API's same-origin policy. Although I was able to circumvent CORS using certain npm packages and API middleware, I scrapped the solution because of its convolution and security risks — static-site generation and client-side rendering meant that the API credentials could be revealed in the browser by console-logging `process.env`.

My natural reaction was to do everything on the server side, so I created an Express app with the goal of piping the data through a templating engine like [Pug](https://pugjs.org). However, this solution led to further issues. Because the template was likely being compiled at build time and the asynchronous API request was not yet made, there was always an uncaught reference to `tickets` in the Pug file.

I finally settled on Next.js, a server-side rendered React.js framework. I was able to use the modern features of React without the limitations of making an API request from the browser. 

#### Using the [`node-zendesk`](https://blakmatrix.github.io/node-zendesk/) package
I ran into authentication and compatibility issues when trying to use the Node.js wrapper of the Zendesk API with Next.js.

#### Keeping things simple
In general, I would've had a much easier time if I adhered to the KISS (keep it simple, _silly_) mantra. I'm glad I learned as much as I did while creating this project, though, and in the future, I'll be able to create webapps faster with a better understanding of optimal solutions and their conventions.

### Potential Improvements
- [ ] Use [paginated Zendesk API requests](https://develop.zendesk.com/hc/en-us/articles/360001068607-Paginating-through-lists) instead of full JSON request to improve load time for larger responses.
- [ ] Implement [shallow routing](https://nextjs.org/docs/routing/shallow-routing) for URL handling of pages in list view.
- [ ] Decrease time to first paint and improve user experience by taking advantage of React state management to display a loading state while the API call is being 
made.
- [ ] Make the props in `getStaticProps()` available globally so that fields don't have to be awkwardly passed through router queries.
- [ ] Organize more blocks of code into components. 
- [ ] Implement OAuth for added security and the ability for users to sign in with their Zendesk accounts on the frontend.
