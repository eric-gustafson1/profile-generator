const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./generateHTML");
const chalk = require("chalk");
const filename = "index.html";

const questions = [];

function writeToFile(filename, data) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chaulk.green("File written successfully"));
  });
}

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userName",
        message: "Enter your GitHub username:"
      },
      {
        type: "list",
        message: "Select your favorite color:",
        name: "color",
        choices: ["green", "blue", "pink", "red"]
      }
    ])
    .then(function(data) {
      console.log(data.color);
      const page = generateHTML.generateHTML(data);
      writeToFile(page);
    });
}

init();
