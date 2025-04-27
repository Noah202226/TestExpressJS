import express from "express";
const router = express.Router();

// Add routes
router.get("/", (req, res) => res.send("Home page"));
router.get("/about", (req, res) => res.send("About page"));
router.get("/contact", (req, res) => res.send("Contact page"));

export default router;
