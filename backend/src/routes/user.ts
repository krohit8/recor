import express, { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { SignInSchema, SignUpSchema } from "../types";
import { prismaClient } from "../db/index";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router = Router();

interface SignUpRequestBody {
  password: string;
  username: string;
  name: string;
}

router.post(
  "/signup",
  //@ts-ignore
  async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
    console.log("signup");
    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);

    if (!parsedData.success) {
      console.log(parsedData.error);
      return res.status(411).json({
        message: "Incorrect input",
      });
    }
    const userExists = await prismaClient.user.findFirst({
      where: {
        username: parsedData.data.username,
      },
    });
    if (userExists) {
      return res.status(403).json({
        message: "User already exists",
      });
    }
    await prismaClient.user.create({
      data: {
        username: parsedData.data.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });
    return res.json({
      message: "Account created successfully",
    });
  }
);

interface SignInRequestBody {
  username: string;
  password: string;
}

router.post(
    "/signin",
    //@ts-ignore
  async (req: Request<{}, {}, SignInRequestBody>, res: Response) => {
    const body = req.body;
    const parsedData = SignInSchema.safeParse(body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input format",
      });
    }
    const user = await prismaClient.user.findFirst({
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
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_PASSWORD
    );
    res.json({
      token: token,
    });
  }
);
 //@ts-ignore
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      username: true,
    },
  });
  return res.json([user]);
});
export const userRouter = router;
