import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function initializeDatabase() {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("Connected to MySQL server");

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);
    console.log(`Using database ${process.env.DB_NAME}`);

    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Projects table created successfully");

    // Create cart table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `);
    console.log("Cart table created successfully");

    // Insert sample projects
    const projects = [
      {
        title: "Kemampuan Merangkum Tulisan",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...",
        category: "BAHASA SUNDA",
        author: "Doni Al-Bajaj Samson",
        image_url:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
      },
      {
        title: "Project Management Basics",
        description:
          "Learn the fundamentals of project management including planning, execution, and monitoring.",
        category: "MANAGEMENT",
        author: "Jane Smith",
        image_url:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      },
    ];

    for (const project of projects) {
      await connection.query(
        "INSERT INTO projects (title, description, category, author, image_url) VALUES (?, ?, ?, ?, ?)",
        [
          project.title,
          project.description,
          project.category,
          project.author,
          project.image_url,
        ]
      );
    }
    console.log("Sample projects inserted successfully");

    // Insert sample cart items
    await connection.query(
      "INSERT INTO cart (project_id, user_id) VALUES (?, ?)",
      [1, 1]
    );
    console.log("Sample cart items inserted successfully");

    await connection.end();
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();
