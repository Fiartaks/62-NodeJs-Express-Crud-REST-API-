const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = decodedData?.id;
    } else {
      return res.status(401).json({ message: "Token not provided" });
    }
    
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = auth;