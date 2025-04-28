const logger = (req, res, next) => {
  const { method, url } = req;
  const date = new Date().toLocaleString();
  console.log(`[${date}] ${method} request to ${url}`);
  next();
};

export default logger;
// This middleware logs the request method, URL, and date/time to the console
// for every incoming request. It uses the `next()` function to pass control to the next middleware or route handler in the stack.
// This is useful for debugging and monitoring the server's activity.
