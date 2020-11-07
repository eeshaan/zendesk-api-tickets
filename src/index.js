require("dotenv").config();

const express = require("express");
const path = require("path");
const zendesk = require("node-zendesk");
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

const client = zendesk.createClient({
  username: process.env.EMAIL,
  token: process.env.API_TOKEN,
  remoteUri: `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2`,
});

client.tickets
  .list()
  .then((res) => {
    const json = JSON.stringify(res);
    console.log(json);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  // res.render("index", { tickets: json } );
});

app.listen(app.get("port"), () => {
  console.log("Listening on port " + app.get("port") + "...");
});
 
// console.log(process.env.USING_API_AUTH);

// var client =
//   process.env.USING_API_AUTH === "true"
//     ? zendesk.createClient({
//         username: `${process.env.EMAIL}:${process.env.PASSWORD}`,
//         remoteUri: `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2`,
//       })
//     : zendesk.createClient({
//         username: process.env.EMAIL,
//         token: process.env.API_TOKEN,
//         remoteUri: `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2`,
//       });

// if (process.env.USING_API_AUTH === "true") {
//   const client = zendesk.createClient({
//     username: process.env.EMAIL,
//     token: process.env.API_TOKEN,
//     remoteUri: `https://${process.env.SUBDOMAIN}.zendesk.com/api/v2`,
//   });
// } else {
// }
