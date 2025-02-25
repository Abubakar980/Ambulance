export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Access denied" });
    if (tokenBlacklist.has(token)) return res.status(401).json({ message: "Token expired, please log in again" });

    try {
        const verified = jwt.verify(token, "your_secret_key");
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
