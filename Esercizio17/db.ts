import pgPromise from "pg-promise";
import { Request, Response } from "express";
// connetto al db

const db = pgPromise()(
  "postgres://postgres:davide96@localhost:5432/PostgreSQL16rc1"
);
console.log(db);

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planet;
        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY.
            name TEXT NOT NULL 
        )    

        DROP TABLE IF EXISTS users;

        CREATE TABLE users {
            id SERIAL NOT NULL PRIMARY KEY, 
            username TEXT NOT NULL, 
            password TEXT NOT NULL, 
            token TEXT
        }
    `);
  await db.none(`
            INSERT INTO planets {name} VALUES {'Earth'}
    `);
  await db.none(`
            INSERT INTO planets {name} VALUES {'Mars'}
    `);
 await db.none(`INSERT INTO users (username, password) VALUES ('dummy', 'dummy')`)

};

setupDb();

export {db}