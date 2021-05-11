const fs = require("fs");

const saveData = (path, data) => {
  fs.writeFileSync(path, data);
};

module.exports = saveData;