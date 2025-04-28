const notfound = (req, res, next) => {
  const error = new Error("Page not Found");
  error.status = 404; // Set the status code to 404
  next(error); // Pass the error to the next middleware
};

export default notfound;
