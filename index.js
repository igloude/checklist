var chalk = require("chalk"),
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

    console.log("result.checklist:");
    console.log(list);

    if (list != null) {
      getChecklist("./__mocks__/data.yaml");
    } else {
      restart();
    }
  });
}

function getChecklist(file) {
  try {
    let fileContents = fs.readFileSync(file, "utf8");
    let data = yaml.safeLoadAll(fileContents);

    printer(data);
  } catch (e) {
    console.log(e);
    restart();
  }
}

function restart() {
  console.log("Please enter a valid checklist name.");
  console.log("");
  promptChecklistName();
}

function printer(data) {
  clear();
  console.log(art);
  console.log(chalk.inverse(data[1].title));
  console.log(data);
}

// checkItem() {
//   read current checklist
//   find fist 'list' item with status === false
//   set status = true
// }

prompt.start();
promptChecklistName();
