const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log('Authenticating token...');
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        console.log('No token found');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.status(403).json({ error: 'Token verification failed', details: err.message });
        }
        console.log('Decoded user:', user);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;