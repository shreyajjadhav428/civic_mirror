import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token in the Authorization header.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Access denied. Missing or malformed authentication token.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid or expired token.'
    });
  }
};

/**
 * Middleware to restrict route access strictly to specific roles (e.g., 'admin').
 */
export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Insufficient permissions. Access restricted to '${role}' role.`
      });
    }
    next();
  };
};