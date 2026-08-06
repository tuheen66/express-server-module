"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./middleware/logger"));
const user_routes_1 = require("./modules/user/user.routes");
const todo_routes_1 = require("./modules/todo/todo.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
const port = config_1.default.port;
// parser
app.use(express_1.default.json());
(0, db_1.default)();
app.get("/", logger_1.default, (req, res) => {
    res.send("Hello Next Level Developers!");
});
app.use("/users", user_routes_1.userRoutes);
app.use("/todos", todo_routes_1.todoRoutes);
app.use("/auth", auth_routes_1.authRoutes);
//? not found route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
