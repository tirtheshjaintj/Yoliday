import { Router } from "express";
import { body, param } from "express-validator";
import {
  getProjects,
  addToCart,
  getCart,
} from "../controllers/projectController";

const router = Router();

// Get projects with pagination
router.get("/projects", getProjects);

// Add project to cart
router.post(
  "/cart",
  [
    body("project_id").isInt().withMessage("Project ID must be an integer"),
    body("user_id").isInt().withMessage("User ID must be an integer"),
  ],
  addToCart
);

// Get cart items for a user
router.get(
  "/cart/:user_id",
  [param("user_id").isInt().withMessage("User ID must be an integer")],
  getCart
);

export default router;
