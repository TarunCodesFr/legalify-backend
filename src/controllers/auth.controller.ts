import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerInput, loginInput } from "../validators/auth.validator";
import { createUser, retrieveUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const validatation = registerInput.safeParse(req.body);
    if (!validatation.success) {
      return res.status(400).json({
        error: validatation.error.issues.map((e) => e.message),
      });
    }

    const { email, username, password } = validatation.data;

    const user = await createUser(email, username, password);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      message: err?.message || "Internal Server Error",
      code: err?.code || null,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validatation = loginInput.safeParse(req.body);
    if (!validatation.success) {
      return res.status(400).json({
        error: validatation.error.issues.map((e) => e.message),
      });
    }

    const { email, password } = validatation.data;

    const user = await retrieveUser(email, password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });

    res.json({
      message: "Logged in successfully",
      token,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
