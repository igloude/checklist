const chalk = require("chalk"),
  clear = require("clear"),
  figlet = require("figlet"),
  fs = require("fs"),
  prompt = require("prompt"),
  yaml = require("js-yaml");

function evaluateChecklistName() {}

function getChecklist() {
  try {
    let fileContents = fs.readFileSync("./__mocks__/data.yaml", "utf8");
    let data = yaml.safeLoadAll(fileContents);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

function restart() {
  console.log("Please enter a valid checklist name.");
  console.log("");
  evaluateChecklistName();
}

prompt.start();
evaluateChecklistName();
