const express = require("express");
const path = require("path");
const routes = require("./routes/index");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// After allllll that above middleware, we finally handle our own routes!
app.use("/", routes);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`🏃‍🤸‍ Express running → PORT ${server.address().port} 🏃‍🤸‍`);
});

module.exports = app;
