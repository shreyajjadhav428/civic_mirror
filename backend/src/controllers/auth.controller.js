import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

/**
 * POST /api/auth/login
 * Validates credentials and generates a signed JWT token with user role claims.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'Email and password are required.'
      });
    }

    // Query user record from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !user) {
      return res.status(401).json({
        authenticated: false,
        message: 'Invalid email or password.'
      });
    }

    // Sign the JWT token (valid for 24 hours)
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      authenticated: true,
      role: user.role,
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error in auth controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};