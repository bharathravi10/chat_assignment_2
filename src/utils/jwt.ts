import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "123456";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};
