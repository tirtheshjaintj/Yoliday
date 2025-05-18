"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
// Get projects with pagination
router.get("/projects", projectController_1.getProjects);
// Add project to cart
router.post("/cart", [
    (0, express_validator_1.body)("project_id").isInt().withMessage("Project ID must be an integer"),
    (0, express_validator_1.body)("user_id").isInt().withMessage("User ID must be an integer"),
], projectController_1.addToCart);
// Get cart items for a user
router.get("/cart/:user_id", [(0, express_validator_1.param)("user_id").isInt().withMessage("User ID must be an integer")], projectController_1.getCart);
exports.default = router;
