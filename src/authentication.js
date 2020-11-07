const prompts = require("prompts");
const fs = require("fs");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "subdomain",
      message: "Enter the Zendesk subdomain to target",
    },
    {
      type: "text",
      name: "email",
      message: "Email",
    },
    {
      type: "select",
      name: "authentication_method",
      message: "Specify the authentication type",
      choices: [
        {
          title: "API Token",
          description: "Retrieved from Zendesk admin dashboard",
        },
        { title: "Password" },
      ],
      hint:
        "API Token option recommended to avoid storing password in plain text",
      instructions: false,
      initial: 0,
    },
    {
      type: (prev) => (prev === 0 ? "password" : null),
      name: "api_token",
      message: "API Token",
    },
    {
      type: (prev) => (prev === 1 ? "password" : null),
      name: "password",
      message: "Password",
    },
  ]);

  if (response.authentication_method === 0) {
    fs.writeFile(
      ".env",
      `SUBDOMAIN=${response.subdomain}
EMAIL=${response.email}
USING_API_AUTH=true
API_TOKEN=${response.api_token}`,
      (err) => {
        if (err) throw err;
        console.log("Authentication information saved in .env file!");
      }
    );
  } else {
    fs.writeFile(
      ".env",
      `SUBDOMAIN=${response.subdomain}
EMAIL=${response.email}
USING_API_AUTH=false
PASSWORD=${response.password}`,
      (err) => {
        if (err) throw err;
        console.log("Authentication information saved in .env file!");
      }
    );
  }
})();
