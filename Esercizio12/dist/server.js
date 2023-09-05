//@ts-nocheck
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { getAll, getOneById, create, updateById, deleteById } from "./controllers/planet";
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());
let planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" }
];
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);
app.listen(port, () => {
    console.log("listen ${port}");
});
