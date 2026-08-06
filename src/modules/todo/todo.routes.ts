import express, { Request, Response } from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodo);

router.get("/:id", todoController.getSingleTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deletedTodo);

export const todoRoutes = router;
