"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...roles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        // console.log({ authToken: token });
        try {
            if (!token) {
                return res.status(500).json({ message: " Your are not authorized" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            //! make change in express namespace "type/express/index.ts" to add user type in Request type"
            req.user = decoded; //? to access user from everywhere through req.uer
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    success: false,
                    error: "Unauthorized",
                });
            }
            console.log({ decoded });
            next();
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };
};
exports.default = auth;
