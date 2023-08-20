// prima cosa import il dotenv

require("dotenv").config()
//importo express
const express = require("express")
const app = express()
// importo il database sistemandolo per un file js e non typescript

const planet = [{
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },]

// uso app use 

app.use(express.urlencoded());
app.use(express.json())

// scrivo il path per vedere se il server funziona 
app.get("/", (_, res) => {
    return res.status(200).json({message:"im online"})
})

//avviamo il server

const online = process.env.SERVER_PORT;
app.listen(online,() => {
    console.log(`server online is ${online}`);
})

// il server funziona!