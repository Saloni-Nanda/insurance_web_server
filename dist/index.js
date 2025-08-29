"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
const sendEmail_1 = __importDefault(require("./routes/sendEmail"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(cors());
app.use(express_1.default.json());
// Route
app.use('/send-email', sendEmail_1.default);
// app.get('/', (_req, res) => {
//   res.send('Email backend is running 🚀');
// });
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
