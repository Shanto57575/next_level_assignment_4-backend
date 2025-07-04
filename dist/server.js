"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield mongoose_1.default.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
        });
        console.log(`MONGODB CONNECTED!!! CONNECTION HOST: ${dbConnection.connection.host}`);
        app_1.default.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Database connection error", error);
        process.exit(1);
    }
});
connectDB();
