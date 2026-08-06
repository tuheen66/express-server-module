"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const todo_service_1 = require("./todo.service");
const createTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.createTodo(req.body);
        res.status(201).json({
            success: true,
            message: "Todo created",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
const getTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.getTodo();
        res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
const getSingleTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await todo_service_1.todoServices.getSingleTodo(id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Todo retrieved",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
const updateTodo = async (req, res) => {
    const { title, completed } = req.body;
    try {
        const result = await todo_service_1.todoServices.updateTodo(title, completed, req.params.id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Todo retrieved successfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
const deletedTodo = async (req, res) => {
    //   console.log(req.params.id);
    try {
        const result = await todo_service_1.todoServices.deleteTodo(req.params.id);
        if (result.rowCount === 0) {
            res.status(500).json({
                success: false,
                message: "Todo not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Todo deleted successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
exports.todoController = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deletedTodo,
};
