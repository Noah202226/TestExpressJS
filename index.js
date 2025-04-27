import express from "express";
import path from "path";
import posts from "./routes/posts.js"; // Import the posts router
import home from "./routes/home.js"; // Import the home router

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.use("/", home); // Use the home router for the root path
app.use("/api/posts", posts);

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
    { method: "POST", path: "/api/users" },
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  console.log(format("\n📋 API Routes:", "bold"));

  console.log(
    `→ Home: ${createClickableLink(
      `http://localhost:${PORT}/`,
      "http://localhost:" + PORT + "/"
    )}`
  );

  printRoutes(); // Call the function to print all routes
});
