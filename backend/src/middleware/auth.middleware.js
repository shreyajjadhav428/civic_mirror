import jwt from 'jsonwebtoken';

// ── DEV AUTH BYPASS ──────────────────────────────────────────────────
// Set process.env.DISABLE_AUTH_DEV='false' to enforce strict auth in backend
const DEV_BYPASS_AUTH = process.env.DISABLE_AUTH_DEV !== 'false';

/**
 * Middleware to verify JWT token in the Authorization header.
 */
export const verifyToken = (req, res, next) => {
  if (DEV_BYPASS_AUTH) {
    req.user = { userId: 'dev_user_1', role: 'admin' };
    return next();
  }

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
    if (DEV_BYPASS_AUTH) {
      return next();
    }

    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Insufficient permissions. Access restricted to '${role}' role.`
      });
    }
    next();
  };
};