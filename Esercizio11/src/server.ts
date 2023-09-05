

//@ts-nocheck
import express from "express";
import "express-async-errors";
import morgan from "morgan"
import Joi from "joi"

const Joi = require("joi")
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json())

const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})

type Planet = {
    id:number;
    name:string;
}

type Planets = Planet[]

let planets = [
    {id:1, name:"Earth"},
    {id:2, name:"Mars"}
] 

app.get("/api/planets", (req, res) =>  {
    res.status(200).json(planets) //Stampiamo tutti i pianeti (stampa correttamente in postman)
});

app.get("/api/planets/:id", (req, res ) => {
    const {id} = req.params
    const planet= planets.find((p) => p.id === Number(id))
    res.status(200).json(planet); // stampiamo un determinato id (stampa correttamente)
})

app.post("/api/planets", (req, res) => {
    const {id,name} = req.body // diciamo dove mandare
    const newPlanet = {id, name} // diciamo da cosa è composto il nuovo planet

    planets = [...planets, newPlanet] // prendiamo il vecchio planet ed aggiungiamo il nuovo 

    res.status(201).json({msg: "planet add"}) // su postman stampa questo messaggio e nel terminale stampa il codice 201

    console.log(planets); // metto questo console per visualizzare nel terminale  
})

app.put("/api/planets/:id", ( req, res) =>{
    const {id} = req.params
    const {name} = req.body
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)

    console.log(planets);
    res.status(200).json({msg: "update"})
})

app.delete("/api/planets/:id", (req, res) => {
    const {id} = req.params
    planets = planets.filter(p => p.id !== Number(id))

    res.status(200).json({msg: "planet delete"})
})

app.listen(port, () => {
    console.log("listen ${port}");
    
})