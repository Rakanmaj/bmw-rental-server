// Check if user is logged in
export const requireAuth = (req, res, next) => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: login required" });
  }

  req.userId = userId;
  next();
};

// Check if user is admin
export const requireAdmin = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: admin access only" });
  }

  next();
};
