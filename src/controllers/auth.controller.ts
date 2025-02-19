import { Request, Response } from "express";
import { db } from "../config/db";
import { hashPassword, comparePasswords } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { AuthConstants } from "../utils/constants";

// Register User
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: AuthConstants.ALL_FIELDS_ERROR });
      return;
    }

    const [existingUser]: any = await db.query(
      "SELECT id FROM user_details WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      res
        .status(400)
        .json({ success: false, message: AuthConstants.EMAIL_ALREADY_ERROR });
      return;
    }

    const hashedPassword = await hashPassword(password);

    await db.query(
      "INSERT INTO user_details (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ success: true, message: AuthConstants.SUCCESS_MSG });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: AuthConstants.REG_ERROR });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: AuthConstants.ALL_FIELDS_ERROR });
      return;
    }

    const [users]: any = await db.query(
      "SELECT id, password FROM user_details WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      res
        .status(401)
        .json({ success: false, message: AuthConstants.INVALID_CREDENTIALS });
      return;
    }

    const user = users[0];

    if (!(await comparePasswords(password, user.password))) {
      res
        .status(401)
        .json({ success: false, message: AuthConstants.INVALID_CREDENTIALS });
      return;
    }

    const token = generateToken(user.id);

    res
      .status(200)
      .json({ success: true, message: AuthConstants.LOGIN_SUCCESS_MSG, token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: AuthConstants.LOGIN_ERROR });
  }
};
