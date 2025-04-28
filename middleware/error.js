const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
// This middleware handles errors that occur in the application. It checks if the error has a status property and sends an appropriate response. If not, it defaults to a 500 Internal Server Error response.
