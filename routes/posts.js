import express from "express";
const router = express.Router();

// Add routes
router.get("/", (req, res) => res.send("Home page"));
router.get("/about", (req, res) => res.send("About page"));
router.get("/contact", (req, res) => res.send("Contact page"));

router.get("/api/users", (req, res) => res.json({ users: [] }));
router.post("/api/users", (req, res) =>
  res.status(201).json({ message: "User created" })
);
router.get("/api/products", (req, res) => res.json({ products: [] }));
router.get("/api/products/:id", (req, res) =>
  res.json({ product: { id: req.params.id } })
);
router.post("/api/products", (req, res) =>
  res.status(201).json({ message: "Product created" })
);

export default router;
