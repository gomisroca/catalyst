const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ error: message });
};

const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ data });
};

const sendNoContent = (res, statusCode = 204) => {
  res.status(statusCode).end();
};

export { sendError, sendSuccess, sendNoContent };
