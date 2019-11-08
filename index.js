const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const generateHTML = require("./generateHTML");
const filename = "index.html";
const questions = ["Enter your GitHub username:", "Select your favorite color:"];

function writeToFile(filename, data) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.green("File written successfully"));
  });
}

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: questions[0]
      },
      {
        type: "list",
        message: questions[1],
        name: "color",
        choices: ["green", "blue", "pink", "red"]
      }
    ])
    .then(function(data) {
      const queryUrl = `https://api.github.com/users/${data.username}/repos?per_page=100`;
      axios.get(queryUrl).then(function(res) {
        console.log(res.data);
      });
    });
  // .then(function(data) {
  //   const page = generateHTML.generateHTML(data);
  //   writeToFile(filename, page);
  // });
}

init(questions);

// .then(function({ username }) {
//   const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//   axios.get(queryUrl).then(function(res) {
//     // const repoList = res.data.map(repo => repo.name);
//     // console.log(repoList);

//     // const repoNameStr = repoList.join("\n");
//     // console.log(repoNameStr);

//     console.log(res.data)
//   })
// .then(function(data) {
//   console.log(data.color);
//   const page = generateHTML.generateHTML(data);
//   writeToFile(filename, page);
// });
