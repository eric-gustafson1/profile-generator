const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

const questions = [];

function writeToFile(fileName, data) {}

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
      console.log(data);
    });
}

init();
