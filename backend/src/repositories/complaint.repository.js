import { supabase } from '../config/supabase.js';

/**
 * Creates a new complaint entry in Supabase.
 */
export const createComplaintRepo = async (complaintData) => {
  const { data, error } = await supabase
    .from('complaints')
    .insert([complaintData])
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

/**
 * Fetches a complaint by its ID or complaint_code, joining related project and department details.
 */
export const getComplaintByIdRepo = async (id) => {
  const { data, error } = await supabase
    .from('complaints')
    .select(`
      *,
      projects (
        id,
        project_code,
        title,
        status,
        expected_completion,
        departments (
          name,
          code
        )
      )
    `)
    .or(`id.eq.${id},complaint_code.eq.${id}`)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

/**
 * Searches for an active or planned project within the specified pincode and category.
 */
export const findMatchingProject = async (pincode, category) => {
  const { data, error } = await supabase
    .from('projects')
    .select('id, project_code, title, status, expected_completion')
    .eq('pincode', pincode)
    .ilike('category', `%${category}%`)
    .in('status', ['In Progress', 'Planning'])
    .limit(1);

  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
};