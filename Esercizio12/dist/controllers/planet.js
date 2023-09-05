// spostiamo il database

import { Request, Response } from "express";
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets:Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const getAll = (req:Request, res:Response) => {
  res.status(200).json(planets);
};

const getOneById = (req:Request, res:Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet); // stampiamo un determinato id (stampa correttamente)
};

const create = (req:Request, res:Response) => {
  const { id, name } = req.body; // diciamo dove mandare
  const newPlanet = { id, name }; // diciamo da cosa è composto il nuovo planet

  planets = [...planets, newPlanet]; // prendiamo il vecchio planet ed aggiungiamo il nuovo

  res.status(201).json({ msg: "planet add" }); // su postman stampa questo messaggio e nel terminale stampa il codice 201

  console.log(planets); // metto questo console per visualizzare nel terminale
};

const updateById = (req:Request, res:Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  console.log(planets);
  res.status(200).json({ msg: "update" });
};

const deleteById = (req:Request, res:Response) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "planet delete" });
};

export {
    getAll, getOneById, create, updateById, deleteById
}
