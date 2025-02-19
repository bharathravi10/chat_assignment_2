import { Request, Response } from "express";
import xlsx from "xlsx";
import fs from "fs";
import { db } from "../config/db";
import { AuthenticatedRequest } from "../types/express";
import { ChatConstants } from "../utils/constants";

export const importChat = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: ChatConstants.NO_FILE });
      return;
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and Process Data
    const validChats = [];
    for (const row of data) {
      if (!row.message || !row.status) {
        continue;
      }
      if (
        ![ChatConstants.PENDING, ChatConstants.COMPLETED].includes(
          row.status.toLowerCase()
        )
      ) {
        continue;
      }
      validChats.push([
        req.user?.userId,
        row.message,
        row.status.toLowerCase(),
      ]);
    }

    if (validChats.length === 0) {
      res
        .status(400)
        .json({ success: false, message: ChatConstants.NO_VALID_DATA });
      return;
    }

    // Insert data into the database
    await db.query(
      "INSERT INTO chat_history (user_id, message, status) VALUES ?",
      [validChats]
    );

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    res.status(201).json({ success: true, message: ChatConstants.SUCCESS_MSG });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: ChatConstants.INTERNAL_SERVER_ERROR });
  }
};

export const getChats = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const filter = req.query.filter as string;
    let query = "SELECT * FROM chat_history WHERE user_id = ?";
    let queryParams: any[] = [req.user?.userId];

    if (
      filter === ChatConstants.PENDING ||
      filter === ChatConstants.COMPLETED
    ) {
      query += " AND status = ?";
      queryParams.push(filter);
    }

    const [chats]: any = await db.query(query, queryParams);

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: ChatConstants.INTERNAL_SERVER_ERROR });
  }
};
