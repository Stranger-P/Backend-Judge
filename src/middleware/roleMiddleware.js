const roleMiddleware = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;
  // console.log(user.role);
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
  }
  next();
};

module.exports = roleMiddleware;