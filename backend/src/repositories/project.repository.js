import { supabase } from '../config/supabase.js';

export const getProjectByCodeRepo = async (projectCode) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      departments(name, code),
      budgets(total_allocated, spent, fiscal_year)
    `)
    .eq('project_code', projectCode)
    .single();

  if (error) return null;
  return data;
};

export const getProjectsByPincodeRepo = async (pincode, category = null) => {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('pincode', pincode);

  if (category) {
    query = query.ilike('category', `%${category}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};