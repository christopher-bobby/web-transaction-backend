const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    console.log("header token", token, req)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'bnc-web-token', function(err, decoded) {
            if(err) {
                console.log("error decoded", decoded, err)
            }
          }
        );
        // req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };


module.exports = verifyToken;