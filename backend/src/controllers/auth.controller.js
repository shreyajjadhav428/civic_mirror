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
      .select('id, email, role, area, pincode')
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
        email: user.email,
        area: user.area || 'Shanti Nagar',
        pincode: user.pincode || '110025'
      }
    });

  } catch (error) {
    console.error('Error in auth controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/auth/register
 * Registers a new user and generates sequential user IDs (user-citizen-1, user-citizen-2, etc.).
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password, role = 'citizen', area = 'Shanti Nagar', pincode = '110025' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'Email and password are required.'
      });
    }

    // 1. Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        error: 'UserExists',
        message: 'An account with this email address already exists.'
      });
    }

    // 2. Count existing users with this role to generate sequential ID
    const { data: roleUsers } = await supabase
      .from('users')
      .select('id')
      .eq('role', role);

    const count = (roleUsers || []).length + 1;
    const newUserId = `user-${role}-${count}`;

    const newUserPayload = {
      id: newUserId,
      email,
      password,
      role,
      area,
      pincode
    };

    // 3. Insert into Supabase users table
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert([newUserPayload])
      .select('id, email, role, area, pincode')
      .single();

    if (insertError) {
      console.error('Error inserting new user record:', insertError);
      throw insertError;
    }

    const token = jwt.sign(
      { userId: insertedUser.id, role: insertedUser.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      authenticated: true,
      role: insertedUser.role,
      token,
      user: {
        id: insertedUser.id,
        email: insertedUser.email,
        area: insertedUser.area || area,
        pincode: insertedUser.pincode || pincode
      }
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/auth/profile/:userId
 * Fetches user details (id, email, role, area, pincode).
 */
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role, area, pincode, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'NotFound', message: 'User profile not found.' });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        area: user.area || 'Shanti Nagar',
        pincode: user.pincode || '110025',
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * PUT /api/auth/profile/:userId
 * Updates user profile details (email, area, pincode).
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password, area, pincode } = req.body;

    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (area !== undefined) updates.area = area;
    if (pincode !== undefined) updates.pincode = pincode;

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id, email, role, area, pincode, created_at')
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return res.status(200).json({
      status: 'success',
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        area: updatedUser.area || 'Shanti Nagar',
        pincode: updatedUser.pincode || '110025',
        created_at: updatedUser.created_at
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};