const figlet = require("figlet");

figlet("F Society", function (error, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});