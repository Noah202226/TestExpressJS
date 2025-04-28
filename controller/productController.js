// This file is to clean up routes and keep them organized. Each route file can handle its own set of routes, making it easier to manage the codebase as it grows. The main server file can then import these route files and use them with the Express app instance.

import Product from "../models/product.model.js";

// @desc Get all posts
// @route GET /api/posts
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get single post
// @route GET /api/post
// @access Public
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc POST all products
// @route POST /api/products
// @access Public
export const createProduct = async (req, res, next) => {
  console.log("Request body:", req.body);

  try {
    // Simulate validation errors
    if (!req.body.name || !req.body.price) {
      const error = new Error("Invalid product data");
      error.status = 400; // Set the status code to 400
      return next(error); // Pass the error to the next middleware
    }

    if (isNaN(req.body.price))
      return next({ status: 400, message: "Invalid price" });

    console.log("Creating product with data:", req.body);
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Delete Single post
// @route Delete /api/post
// @access Public
export const deleteProduct = async (req, res, next) => {
  try {
    const products = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ products, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error Deleting products:", error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
// @desc Update Product
// @route PUT /api/products/:id
// @access Public
export const updateProduct = async (req, res, next) => {
  console.log("Request params:", req.params.id);
  console.log("Request body:", req.body);

  try {
    if (isNaN(req.body.price))
      return next({ status: 400, message: "Invalid price" });

    console.log("Updating product with data:", req.body);
    const product = await Product.findOneAndUpdate(req.id, req.body);
    res.status(201).json({ product, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
