const jwt = require('jsonwebtoken');
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing token"});
        
    }
        

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, SUPABASE_JWT_SECRET)
        req.user = payload;
        next();

    } catch (err) {
        return res.status(403).json({error: "Invalid token"});

    }
    
}