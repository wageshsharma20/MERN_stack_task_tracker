const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  
  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate value entered. Task title must be unique.',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
