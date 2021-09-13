const jwt = require("jsonwebtoken");
const JWT_SECRET = "iams@ng@m";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
    // res.send(user);
  } catch (error) {
    res.status(401).send({ error: "1authenticate using a valid token" });
  }
};

module.exports = fetchuser;
