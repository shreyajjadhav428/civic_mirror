/**
 * Packages raw database records into a strict, referenceable evidence dictionary for Gemini.
 */
export const packageEvidenceForAI = (projects = [], documents = []) => {
  const formattedEvidence = {
    projects: projects.map(p => {
      const budgetObj = Array.isArray(p.budgets) ? p.budgets[0] : p.budgets;
      return {
        reference_id: p.project_code || p.id,
        type: 'Project Record',
        title: p.title,
        category: p.category,
        pincode: p.pincode,
        status: p.status || 'In Progress',
        progress_percentage: p.progress ?? 0,
        expected_completion: p.expected_completion ? new Date(p.expected_completion).toISOString().split('T')[0] : 'In Progress',
        department: p.departments?.name || p.category || 'Municipal Operations',
        allocated_budget: budgetObj?.total_allocated,
        spent_budget: budgetObj?.spent,
        people_affected: budgetObj?.people_affected
      };
    }),
    policies: documents.map((d, index) => ({
      reference_id: d.id || `doc-ref-${index}`,
      type: d.source_type || 'Document',
      title: d.title,
      extracted_text: d.content_text,
    }))
  };

  return formattedEvidence;
};