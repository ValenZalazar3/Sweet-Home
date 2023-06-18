import { Router } from "express";

// ? Controllers 

import getAllUsers from "../controllers/user/getAllUsers.js";
import postUser from "../controllers/user/postUser.js";
import getUserById from "../controllers/user/getUserById.js";
import deleteUsers from "../controllers/user/deleteUsers.js";

const router = Router();


//? Rutas .get
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

//? Ruta .post
router.post("/users", postUser);

//? Ruta .delete
router.delete("users/:id", deleteUsers)

export default router;