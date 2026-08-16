import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import { supabase } from '../config/supabase.js';

const PROJECTS_SEED = [
  // 1. Electricity & Street Lighting
  {
    id: 'proj-el-101',
    project_code: 'PRJ-EL-101',
    title: 'Smart Solar Streetlight Installation on Ring Road',
    category: 'Electricity & Street Lighting',
    department_id: 'dept-elec',
    pincode: '110025',
    status: 'In Progress',
    progress: 60,
    expected_completion: '2026-10-30',
    budget: 3500000,
    spent: 2100000,
    people_affected: 4200
  },
  {
    id: 'proj-el-102',
    project_code: 'PRJ-EL-102',
    title: 'Underground Electric Cable Ducting Phase II',
    category: 'Electricity & Street Lighting',
    department_id: 'dept-elec',
    pincode: '400001',
    status: 'In Progress',
    progress: 40,
    expected_completion: '2026-12-15',
    budget: 5200000,
    spent: 2080000,
    people_affected: 6800
  },

  // 2. Water Supply & Water Works
  {
    id: 'proj-wt-201',
    project_code: 'PRJ-WT-201',
    title: 'High-Pressure Water Trunk Line Replacement',
    category: 'Water Supply & Water Works',
    department_id: 'dept-water',
    pincode: '110025',
    status: 'In Progress',
    progress: 50,
    expected_completion: '2026-11-15',
    budget: 4800000,
    spent: 2400000,
    people_affected: 5500
  },
  {
    id: 'proj-wt-202',
    project_code: 'PRJ-WT-202',
    title: 'Smart Automated Water Metering & Supply System',
    category: 'Water Supply & Water Works',
    department_id: 'dept-water',
    pincode: '400012',
    status: 'Planning',
    progress: 10,
    expected_completion: '2027-02-28',
    budget: 2900000,
    spent: 290000,
    people_affected: 3100
  },

  // 3. Roads & Public Works
  {
    id: 'proj-rd-301',
    project_code: 'PRJ-RD-301',
    title: 'Main Arterial Avenue Bituminous Resurfacing',
    category: 'Roads & Public Works',
    department_id: 'dept-roads',
    pincode: '110025',
    status: 'In Progress',
    progress: 70,
    expected_completion: '2026-09-30',
    budget: 6500000,
    spent: 4550000,
    people_affected: 8400
  },
  {
    id: 'proj-rd-302',
    project_code: 'PRJ-RD-302',
    title: 'Pedestrian Footpath & Barrier-Free Walkways',
    category: 'Roads & Public Works',
    department_id: 'dept-roads',
    pincode: '110026',
    status: 'In Progress',
    progress: 35,
    expected_completion: '2026-11-30',
    budget: 1800000,
    spent: 630000,
    people_affected: 2900
  },

  // 4. Sewerage & Sanitation
  {
    id: 'proj-sew-401',
    project_code: 'PRJ-SEW-401',
    title: 'Deep Sewer Line Desilting and Rehabilitation',
    category: 'Sewerage & Sanitation',
    department_id: 'dept-sew',
    pincode: '110025',
    status: 'In Progress',
    progress: 45,
    expected_completion: '2026-10-15',
    budget: 3200000,
    spent: 1440000,
    people_affected: 4600
  },
  {
    id: 'proj-sew-402',
    project_code: 'PRJ-SEW-402',
    title: 'Decentralized Sewage Treatment Plant Installation',
    category: 'Sewerage & Sanitation',
    department_id: 'dept-sew',
    pincode: '400008',
    status: 'In Progress',
    progress: 25,
    expected_completion: '2027-01-20',
    budget: 7800000,
    spent: 1950000,
    people_affected: 9200
  },

  // 5. Solid Waste Management
  {
    id: 'proj-sw-501',
    project_code: 'PRJ-SW-501',
    title: 'Automated Zero-Waste Organic Composting Plant',
    category: 'Solid Waste Management',
    department_id: 'dept-waste',
    pincode: '110025',
    status: 'In Progress',
    progress: 55,
    expected_completion: '2026-11-10',
    budget: 2600000,
    spent: 1430000,
    people_affected: 3800
  },
  {
    id: 'proj-sw-502',
    project_code: 'PRJ-SW-502',
    title: 'Smart IoT-Enabled Waste Bins & Compactor Depots',
    category: 'Solid Waste Management',
    department_id: 'dept-waste',
    pincode: '400001',
    status: 'Planning',
    progress: 15,
    expected_completion: '2026-12-31',
    budget: 1900000,
    spent: 285000,
    people_affected: 5100
  },

  // 6. Storm Water & Drainage
  {
    id: 'proj-dr-601',
    project_code: 'PRJ-DR-601',
    title: 'Monsoon Flood Prevention Underground Storm Drain',
    category: 'Storm Water & Drainage',
    department_id: 'dept-storm',
    pincode: '110025',
    status: 'In Progress',
    progress: 80,
    expected_completion: '2026-08-30',
    budget: 8400000,
    spent: 6720000,
    people_affected: 11000
  },
  {
    id: 'proj-dr-602',
    project_code: 'PRJ-DR-602',
    title: 'Low-Lying Catchment Area Drainage Pumping Station',
    category: 'Storm Water & Drainage',
    department_id: 'dept-storm',
    pincode: '422001',
    status: 'In Progress',
    progress: 30,
    expected_completion: '2026-11-25',
    budget: 4100000,
    spent: 1230000,
    people_affected: 4900
  },

  // 7. Parks & Horticulture
  {
    id: 'proj-pk-701',
    project_code: 'PRJ-PK-701',
    title: 'Urban Miyawaki Forest & Green Buffer Zone',
    category: 'Parks & Horticulture',
    department_id: 'dept-parks',
    pincode: '110025',
    status: 'In Progress',
    progress: 65,
    expected_completion: '2026-10-20',
    budget: 1400000,
    spent: 910000,
    people_affected: 2500
  },
  {
    id: 'proj-pk-702',
    project_code: 'PRJ-PK-702',
    title: 'Community Eco-Park & Children Recreational Area',
    category: 'Parks & Horticulture',
    department_id: 'dept-parks',
    pincode: '110026',
    status: 'Completed',
    progress: 100,
    expected_completion: '2026-06-30',
    budget: 2200000,
    spent: 2200000,
    people_affected: 3600
  },

  // 8. Building & Urban Development
  {
    id: 'proj-bd-801',
    project_code: 'PRJ-BD-801',
    title: 'Public Civic Center & Multi-Purpose Ward Hall',
    category: 'Building & Urban Development',
    department_id: 'dept-build',
    pincode: '110025',
    status: 'In Progress',
    progress: 40,
    expected_completion: '2027-03-31',
    budget: 9500000,
    spent: 3800000,
    people_affected: 12500
  },
  {
    id: 'proj-bd-802',
    project_code: 'PRJ-BD-802',
    title: 'Government School Infrastructure Modernization',
    category: 'Building & Urban Development',
    department_id: 'dept-build',
    pincode: '400012',
    status: 'In Progress',
    progress: 50,
    expected_completion: '2026-11-30',
    budget: 4300000,
    spent: 2150000,
    people_affected: 1800
  },

  // 9. Traffic & Transportation
  {
    id: 'proj-tr-901',
    project_code: 'PRJ-TR-901',
    title: 'Adaptive AI Traffic Signal Corridor Modernization',
    category: 'Traffic & Transportation',
    department_id: 'dept-traffic',
    pincode: '110025',
    status: 'In Progress',
    progress: 75,
    expected_completion: '2026-09-15',
    budget: 3700000,
    spent: 2775000,
    people_affected: 14000
  },
  {
    id: 'proj-tr-902',
    project_code: 'PRJ-TR-902',
    title: 'Public EV Fast-Charging Multi-Hub Stations',
    category: 'Traffic & Transportation',
    department_id: 'dept-traffic',
    pincode: '400001',
    status: 'In Progress',
    progress: 20,
    expected_completion: '2026-12-20',
    budget: 2800000,
    spent: 560000,
    people_affected: 4500
  },

  // 10. Public Health & Sanitation
  {
    id: 'proj-hl-1001',
    project_code: 'PRJ-HL-1001',
    title: 'Ward Healthcare Clinic & Diagnostic Center',
    category: 'Public Health & Sanitation',
    department_id: 'dept-health',
    pincode: '110025',
    status: 'In Progress',
    progress: 85,
    expected_completion: '2026-08-31',
    budget: 5600000,
    spent: 4760000,
    people_affected: 7200
  },
  {
    id: 'proj-hl-1002',
    project_code: 'PRJ-HL-1002',
    title: 'Vector-Borne Disease Control & Fogging Depot',
    category: 'Public Health & Sanitation',
    department_id: 'dept-health',
    pincode: '422001',
    status: 'In Progress',
    progress: 35,
    expected_completion: '2026-10-31',
    budget: 1100000,
    spent: 385000,
    people_affected: 3300
  },

  // 11. Animal Welfare & Veterinary
  {
    id: 'proj-an-1101',
    project_code: 'PRJ-AN-1101',
    title: 'Humane Animal Birth Control (ABC) & Shelter Center',
    category: 'Animal Welfare & Veterinary',
    department_id: 'dept-animal',
    pincode: '110025',
    status: 'In Progress',
    progress: 45,
    expected_completion: '2026-11-20',
    budget: 1600000,
    spent: 720000,
    people_affected: 2800
  },
  {
    id: 'proj-an-1102',
    project_code: 'PRJ-AN-1102',
    title: 'Emergency Mobile Veterinary Ambulance Hub',
    category: 'Animal Welfare & Veterinary',
    department_id: 'dept-animal',
    pincode: '400008',
    status: 'Planning',
    progress: 10,
    expected_completion: '2027-01-31',
    budget: 1200000,
    spent: 120000,
    people_affected: 2100
  },

  // 12. Environment & Pollution Control
  {
    id: 'proj-en-1201',
    project_code: 'PRJ-EN-1201',
    title: 'Continuous Real-Time Air Quality Monitoring Stations',
    category: 'Environment & Pollution Control',
    department_id: 'dept-env',
    pincode: '110025',
    status: 'In Progress',
    progress: 90,
    expected_completion: '2026-08-25',
    budget: 2400000,
    spent: 2160000,
    people_affected: 15000
  },
  {
    id: 'proj-en-1202',
    project_code: 'PRJ-EN-1202',
    title: 'Industrial Effluent Detection & Anti-Smog Cannons Hub',
    category: 'Environment & Pollution Control',
    department_id: 'dept-env',
    pincode: '110001',
    status: 'In Progress',
    progress: 50,
    expected_completion: '2026-12-10',
    budget: 3900000,
    spent: 1950000,
    people_affected: 8700
  }
];

async function seedProjects() {
  console.log('Seeding 24 municipal projects across all 12 departments into Supabase...');

  for (const p of PROJECTS_SEED) {
    const projectPayload = {
      id: p.id,
      project_code: p.project_code,
      title: p.title,
      category: p.category,
      department_id: p.department_id,
      pincode: p.pincode,
      status: p.status,
      expected_completion: p.expected_completion,
      progress: p.progress
    };

    const { error: pErr } = await supabase
      .from('projects')
      .upsert([projectPayload], { onConflict: 'id' });

    if (pErr) {
      console.error(`Error seeding project ${p.project_code}:`, pErr.message);
      continue;
    }

    const budgetPayload = {
      id: `bdg-${p.id}`,
      project_id: p.id,
      total_allocated: p.budget,
      spent: p.spent,
      people_affected: p.people_affected,
      fiscal_year: '2026'
    };

    const { error: bErr } = await supabase
      .from('budgets')
      .upsert([budgetPayload], { onConflict: 'id' });

    if (bErr) {
      console.warn(`Warning seeding budget for ${p.project_code}:`, bErr.message);
    } else {
      console.log(`✓ Seeded ${p.project_code}: ${p.title} (${p.category}, Pincode ${p.pincode})`);
    }
  }

  console.log('\nAll projects and budgets successfully seeded into Supabase database!');
}

seedProjects().catch(console.error);
