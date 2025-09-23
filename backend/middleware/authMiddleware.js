//I originally had this in server.js but moved it to use it in my different route files. Didnt know how to export it xd


const jwt = require('jsonwebtoken');


//JWT authorization middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'User not authorised for this route' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'User not authorised for this route' });
  }
}

module.exports = authMiddleware;