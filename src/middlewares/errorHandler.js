const errorHandler = (err, req, res, next) => {
  if (err?.name === "UnauthorizedError") {
    return res
      .status(401)
      .send({ error: true, message: "Access denied, invalid token provided" });
  }
  if (err) {
    return res.status(400).send({ error: true, message: err?.message });
  }
};

module.exports = errorHandler;
