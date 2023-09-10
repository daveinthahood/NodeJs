import pgPromise from "pg-promise";
import { Request, Response } from "express";
// connetto al db
import {db} from "./db"

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planets = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1`,
    Number(id)
  );
  res.status(200).json(planets); // stampiamo un determinato id (stampa correttamente)
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body; // diciamo dove mandare
  const newPlanet = {  name }; // diciamo da cosa è composto il nuovo planet

   await db.none(`
        INSERT INTO planets (name) VALUES ($1)`, name
    )
  res.status(201).json({ msg: "planet add" }); // su postman stampa questo messaggio e nel terminale stampa il codice 201 // metto questo console per visualizzare nel terminale
};

const updateById =async(req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
    await db.none(`
        UPDATE FROM planets SET name=$2 WHERE id=$1`, [id, name])
  res.status(200).json({ msg: "update" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`
    DELETE FROM planets WHERE id=$1`, Number(id))

  res.status(200).json({ msg: "planet delete" });
};

const createImage = async(req:Request, res:Response) =>{
    const {id } = req.params;
    const filename = req.file?.path
    if(filename) {
      db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename]);
      res.status(201).json({msg: "image update"})
    } else {
      res.status(400).json({msg:"planet failed"})
    }
}


export { getAll, getOneById, create, updateById, deleteById, createImage };
