/**
 * Packages raw database records into a strict, referenceable evidence dictionary for Gemini.
 */
export const packageEvidenceForAI = (projects = [], documents = []) => {
  const formattedEvidence = {
    projects: projects.map(p => ({
      reference_id: p.project_code,
      type: 'Project Record',
      title: p.title,
      status: p.status,
      progress_percentage: p.progress,
      department: p.departments?.name,
      allocated_budget: p.budgets?.[0]?.total_allocated,
      spent_budget: p.budgets?.[0]?.spent,
    })),
    policies: documents.map((d, index) => ({
      reference_id: d.id || `doc-ref-${index}`,
      type: d.source_type || 'Document',
      title: d.title,
      extracted_text: d.content_text,
    }))
  };

  return formattedEvidence;
};