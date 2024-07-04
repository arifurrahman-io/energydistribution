const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    // Get token from array
    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;

    // Verify token
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        // Token is valid, continue with the request
        req.authData = authData;
        next();
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Example protected route using verifyToken middleware
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted',
    authData: req.authData // Authenticated user data
  });
});

module.exports = verifyToken;
