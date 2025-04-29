import express from "express";
import cors from "cors";

import { fileURLToPath } from "url";
import path from "path";
import product from "./routes/products.js"; // Import the posts router
import home from "./routes/home.js"; // Import the home router

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js"; // Import the error handling middleware
import notfound from "./middleware/notfound.js"; // Import the notfound middleware
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use();

const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); // Get the current directory name
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Middleware
app.use(logger); // Use the logger middleware for all routes

app.use("/", home); // Use the home router for the root path
app.use("/api/products", product);

// Error handling middleware is below of the route definitions to catch any errors that occur in the application
app.use(notfound); // Use the notfound middleware for 404 errors
app.use(errorHandler); // Use the error handling middleware

// Utility function to create clickable links in terminal
function createClickableLink(url, text) {
  // Terminal hyperlink escape sequence format: \u001B]8;;URL\u0007TEXT\u001B]8;;\u0007
  return `\u001B]8;;${url}\u0007${text || url}\u001B]8;;\u0007`;
}
// Function to format text with colors
function format(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}
// Function to print all registered routes
// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};
// Print registered routes - simpler approach
function printRoutes() {
  console.log(format("\n📋 API Routes:", "bold"));

  // Manually log the routes we've defined
  const routes = [
    { method: "GET", path: "/" },
    { method: "GET", path: "/api/users" },
    { method: "POST", path: "/api/products" },
    { method: "GET", path: "/api/products" },
  ];

  routes.forEach((route) => {
    const url = `http://localhost:${PORT}${route.path}`;

    if (route.method === "GET") {
      console.log(
        `${format(route.method.padEnd(8), "green")} ${createClickableLink(
          url,
          url
        )}`
      );
    } else {
      console.log(
        `${format(route.method.padEnd(8), "yellow")} ${route.path} ${format(
          "(non-GET route)",
          "gray"
        )}`
      );
    }
  });

  console.log(format("\nClick on any GET route to open in browser", "gray"));
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      printRoutes(); // Call the function to print all routes
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
