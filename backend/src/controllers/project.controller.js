import { getProjectByCodeRepo, getProjectsByPincodeRepo } from '../repositories/project.repository.js';

export const getProjectByCode = async (req, res) => {
  try {
    const { projectCode } = req.params;
    const project = await getProjectByCodeRepo(projectCode.toUpperCase());

    if (!project) {
      return res.status(404).json({
        error: 'NotFound',
        message: `Project with code '${projectCode}' was not found.`
      });
    }

    return res.status(200).json({ status: 'success', data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProjectsByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;
    const { category } = req.query;

    const projects = await getProjectsByPincodeRepo(pincode, category);
    return res.status(200).json({ status: 'success', count: projects.length, data: projects });
  } catch (error) {
    console.error('Error fetching projects by pincode:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};