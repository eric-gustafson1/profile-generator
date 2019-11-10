const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
var pdf = require("html-pdf");
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

function appendToFile(filename, data) {
  fs.appendFile(filename, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.green("File appended successfully"));
  });
}

function convertToPDF(filename) {}

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
      const page = generateHTML.generateHTML(data);
      writeToFile(filename, page);
      return data;
    })
    .then(function(data) {
      const queryUrl = `https://api.github.com/users/${data.username}`;
      const starredUrl = `https://api.github.com/users/${data.username}/starred`;

      axios.all([axios.get(queryUrl), axios.get(starredUrl)]).then(responseArr => {
        const htmlBody = generateHTML.generateBody(responseArr);
        appendToFile(filename, htmlBody);
      });

      // return res;
    });
  // .then(function(res) {
  //   fs.readFile(filename, "utf8", function(err, html) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(html);
  //     const options = { format: "letter" };
  //     pdf.create(html, options).toFile("./profile.pdf", function(err, res) {
  //       if (err) return console.log(err);
  //       console.log(res);
  //     });
  //     // return html;
  //   });
  // });
  // .then(function(html) {
  //   console.log(html);
  //   const options = { format: "letter" };
  //   pdf.create(html, options).toFile("./profile.pdf", function(err, res) {
  //     if (err) return console.log(err);
  //     console.log(res);
  //   });
  // });
}

init();

// NPM for html to pdf
// electron and electron-html-to
// axios.all to get an array of response returns
