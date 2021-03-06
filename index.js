var _ = require("lodash"),
  chalk = require("chalk"),
  clear = require("clear"),
  figlet = require("figlet"),
  fs = require("fs"),
  prompt = require("prompt"),
  yaml = require("js-yaml");

var art;

figlet("Checklist", function (err, fig) {
  if (err) {
    console.log("Something went wrong with figlet...");
    console.dir(err);
    return;
  }
  art = fig;
});

function promptChecklistName() {
  prompt.get(["checklist"], function (err, result) {
    var listInputName = result.checklist;
    console.log(listInputName);

    if (listInputName != null) {
      // TODO - update this with user's checklist yaml file
      getChecklist("./__mocks__/data.yaml", listInputName);
    } else {
      console.log(err);
      invalidChecklistTitle(listInputName);
    }
  });
}

function getChecklist(file, listTitle) {
  try {
    let fileContents = fs.readFileSync(file, "utf8");
    let data = yaml.safeLoadAll(fileContents);
    let list = _.find(data, { title: listTitle });

    printer(list);
  } catch {
    invalidChecklistTitle(listTitle);
  }
}

function invalidChecklistTitle(list) {
  console.log(
    'The checklist "' +
      list +
      '" has not been created. Please enter a valid checklist title.'
  );
  console.log("");
  promptChecklistName();
}

function printer(data) {
  var currentToDoIndex = _.findKey(data.list, function (o) {
    return o.status == false;
  });

  clear();
  console.log(art);
  console.log(chalk.white(" " + data.title + ": "));
  _.each(data.list, function (item, i) {
    if (item.status === true) {
      // done
      console.log(chalk.gray.bold(item.title));
    } else if (item.status === false && i === currentToDoIndex) {
      // current todo
      console.log(chalk.white.bold.bgBlue(item.title));
    } else {
      // future todo
      console.log(chalk.gray.bold(item.title));
    }
  });
}

// checkItem() {
//   read current checklist
//   find fist 'list' item with status === false
//   set status = true
//   if final item, listCompleted()
// }

// listCompleted() {
//   console.log complete message
//   resetList()
// }

// resetList() {
//   read current checklist
//   set all items to status: flase
// }

prompt.start();
promptChecklistName();
