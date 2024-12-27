"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    try {
        console.log(process.env.MONGO_URL);
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL not present');
        }
        mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
            console.log('db connected');
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
