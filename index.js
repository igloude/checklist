var _ = require("lodash"),
  chalk = require("chalk"),
  clear = require("clear"),
  figlet = require("figlet"),
  fs = require("fs"),
  prompt = require("prompt"),
  yaml = require("js-yaml");

var art;

figlet("Checklist", function(err, fig) {
  if (err) {
    console.log("Something went wrong with figlet...");
    console.dir(err);
    return;
  }
  art = fig;
});

function promptChecklistName() {
  prompt.get(["checklist"], function(err, result) {
    var list = result.checklist;
    console.log(list);

    if (list != null) {
      // TODO - update this with user's checklist yaml file
      getChecklist("./__mocks__/data.yaml", list);
    } else {
      console.log(err);
      restart(list);
    }
  });
}

function getChecklist(file, list) {
  try {
    let fileContents = fs.readFileSync(file, "utf8");
    let data = yaml.safeLoadAll(fileContents);
    let listIndex = _.findIndex(data, { title: list });

    printer(data[listIndex]);
  } catch {
    restart();
  }
}

function restart(list) {
  console.log(
    'The checklist "' +
      list +
      '" has not been created. Please enter a valid checklist title.'
  );
  console.log("");
  promptChecklistName();
}

function printer(data) {
  clear();
  console.log(art);
  console.log(chalk.inverse(" " + data.title + ": "));
  console.log(data.list);
}

// checkItem() {
//   read current checklist
//   find fist 'list' item with status === false
//   set status = true
// }

prompt.start();
promptChecklistName();
