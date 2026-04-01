const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // token can be sent in header or as a cookie
  const token = req.header('x-auth-token') || (req.cookies && req.cookies.token);
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || config.get('jwtSecret');
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
