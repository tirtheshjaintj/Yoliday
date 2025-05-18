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
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create connection without database
            const connection = yield promise_1.default.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            });
            console.log("Connected to MySQL server");
            // Create database if it doesn't exist
            yield connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
            console.log(`Database ${process.env.DB_NAME} created or already exists`);
            // Use the database
            yield connection.query(`USE ${process.env.DB_NAME}`);
            console.log(`Using database ${process.env.DB_NAME}`);
            // Create projects table
            yield connection.query(`
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
            yield connection.query(`
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
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...",
                    category: "BAHASA SUNDA",
                    author: "Doni Al-Bajaj Samson",
                    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
                },
                {
                    title: "Project Management Basics",
                    description: "Learn the fundamentals of project management including planning, execution, and monitoring.",
                    category: "MANAGEMENT",
                    author: "Jane Smith",
                    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                },
            ];
            for (const project of projects) {
                yield connection.query("INSERT INTO projects (title, description, category, author, image_url) VALUES (?, ?, ?, ?, ?)", [
                    project.title,
                    project.description,
                    project.category,
                    project.author,
                    project.image_url,
                ]);
            }
            console.log("Sample projects inserted successfully");
            // Insert sample cart items
            yield connection.query("INSERT INTO cart (project_id, user_id) VALUES (?, ?)", [1, 1]);
            console.log("Sample cart items inserted successfully");
            yield connection.end();
            console.log("Database initialization completed");
        }
        catch (error) {
            console.error("Error initializing database:", error);
            process.exit(1);
        }
    });
}
initializeDatabase();
