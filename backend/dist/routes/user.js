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
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const index_1 = require("../db/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", 
//@ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup");
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect input",
        });
    }
    const userExists = yield index_1.prismaClient.user.findFirst({
        where: {
            username: parsedData.data.username,
        },
    });
    if (userExists) {
        return res.status(403).json({
            message: "User already exists",
        });
    }
    yield index_1.prismaClient.user.create({
        data: {
            username: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
        },
    });
    return res.json({
        message: "Account created successfully",
    });
}));
router.post("/signin", 
//@ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
        });
    }
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            username: parsedData.data.username,
            password: parsedData.data.password,
        },
    });
    if (!user) {
        return res.status(403).json({
            message: " Wrong credentials",
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
    }, config_1.JWT_PASSWORD);
    res.json({
        token: token,
    });
}));
//@ts-ignore
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            username: true,
        },
    });
    return res.json([user]);
}));
exports.userRouter = router;
