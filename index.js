const fs = require("fs");
const yaml = require("js-yaml");

try {
  let fileContents = fs.readFileSync("./__mocks__/data.yaml", "utf8");
  let data = yaml.safeLoadAll(fileContents);

  console.log(data);
} catch (e) {
  console.log(e);
}
