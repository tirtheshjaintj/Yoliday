import { Request, Response } from "express";
import { validationResult } from "express-validator";
import pool from "../config/database";
import { Project, ProjectInput } from "../types/project";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    console.log(
      "Attempting to fetch projects with limit:",
      limit,
      "and offset:",
      offset
    );

    const [rows] = await pool.query("SELECT * FROM projects LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);

    console.log("Projects fetched successfully:", rows);

    const [total] = await pool.query("SELECT COUNT(*) as count FROM projects");
    const totalCount = (total as any)[0].count;

    console.log("Total count:", totalCount);
    return res.json({
      projects: rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error in getProjects:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { project_id, user_id } = req.body;

    const [result] = await pool.query(
      "INSERT INTO cart (project_id, user_id) VALUES (?, ?)",
      [project_id, user_id]
    );

    res.status(201).json({
      message: "Project added to cart successfully",
      cartItemId: (result as any).insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const [rows] = await pool.query(
      `SELECT p.* FROM projects p
       INNER JOIN cart c ON p.id = c.project_id
       WHERE c.user_id = ?`,
      [user_id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
