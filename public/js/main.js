const output = document.querySelector("#output");
const button = document.querySelector("#get-all-posts");

// Get all posts
async function getAllProducts() {
  try {
    const response = await fetch(
      "https://testexpressjs-2whg.onrender.com/api/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    // Display the data in the output element
    output.innerHTML = ""; // Clear previous output
    output.innerHTML = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error fetching posts:", error);
    output.innerHTML = "Error fetching posts";
  }
}

button.addEventListener("click", getAllProducts);
// Call the function on page load to fetch posts automatically
