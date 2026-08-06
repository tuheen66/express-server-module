"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
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
const singleUser = async (req, res) => {
    //   console.log(req.params.id);
    try {
        const result = await user_service_1.userServices.getSingleUser(req.params.id);
        if (result.rows.length === 0) {
            res.status(500).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
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
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await user_service_1.userServices.updateUser(name, email, req.params.is);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
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
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUser(req.params.id);
        if (result.rowCount === 0) {
            res.status(500).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
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
exports.userController = {
    createUser,
    getUser,
    singleUser,
    updateUser,
    deleteUser
};
