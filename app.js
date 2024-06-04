// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");
const path = require('path');

const connectDB = require("./connect");
const tasks = require("./task");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
  res.send(await fm.ReadData(req));
})

app.post("/api", async (req,res) => {
  console.log(req.body)
  tasks.create(req.body) .then(result => { 
    console.log(result) 
  }).catch(e => {
    console.log(e)
  })

  // res.send(await fm.WriteData(req.body));
})

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'addTask.html'));
});

app.get("/tm/tasks", async (req,res)=>{
  try {
    const task = await tasks.find(); 
    res.status(200).json({task});
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error});
  };
});

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});



// Create a server
const appName = "Task Manager";
const port = 3000;
// app.listen(port, () => {
//   console.log(`App ${appName} is running on port ${port}`);
// })

// Connect to the database and start the appl server
(async function () {
  try {
    await connectDB();
    app.listen(port, () => {console.log(`${appName} is listening on port ${port}.`)});
  } catch (error) {
    console.log(error);
  };
})();