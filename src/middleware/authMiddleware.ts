import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";
import { db } from "../config/db";
import { MiddlewareConstants } from "../utils/constants";

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: MiddlewareConstants.UN_AUTH });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    req.user = { userId: decoded.userId };

    // Check if the user exists
    const [user] = await db.query(
      "SELECT id FROM user_details WHERE id = ? AND is_deleted = 0",
      [req.user.userId]
    );

    if (!user) {
      res
        .status(401)
        .json({ success: false, message: MiddlewareConstants.USER_ERROR });
      return;
    }

    next();
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: MiddlewareConstants.INVALID_TOKEN });
  }
};
