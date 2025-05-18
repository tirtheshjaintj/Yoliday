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
exports.getCart = exports.addToCart = exports.getProjects = void 0;
const express_validator_1 = require("express-validator");
const database_1 = __importDefault(require("../config/database"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        console.log("Attempting to fetch projects with limit:", limit, "and offset:", offset);
        const [rows] = yield database_1.default.query("SELECT * FROM projects LIMIT ? OFFSET ?", [
            limit,
            offset,
        ]);
        console.log("Projects fetched successfully:", rows);
        const [total] = yield database_1.default.query("SELECT COUNT(*) as count FROM projects");
        const totalCount = total[0].count;
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
    }
    catch (error) {
        console.error("Error in getProjects:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getProjects = getProjects;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { project_id, user_id } = req.body;
        const [result] = yield database_1.default.query("INSERT INTO cart (project_id, user_id) VALUES (?, ?)", [project_id, user_id]);
        res.status(201).json({
            message: "Project added to cart successfully",
            cartItemId: result.insertId,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const [rows] = yield database_1.default.query(`SELECT p.* FROM projects p
       INNER JOIN cart c ON p.id = c.project_id
       WHERE c.user_id = ?`, [user_id]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getCart = getCart;
