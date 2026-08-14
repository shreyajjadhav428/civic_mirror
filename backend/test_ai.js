const runTests = async () => {
  console.log('--- TEST 1: SCENARIO A (Existing Active Project Match in Pincode 110025) ---');
  const res1 = await fetch('http://localhost:5000/api/ai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'When will the streetlights in Shanti Nagar pincode 110025 be repaired? It is dark and unsafe.'
    })
  });
  const data1 = await res1.json();
  console.log('Scenario A Response Status:', res1.status);
  console.log('Scenario A Payload:', JSON.stringify(data1, null, 2));

  console.log('\n--- TEST 2: SCENARIO B (Unique Request - No Active Project in Pincode 560001) ---');
  const res2 = await fetch('http://localhost:5000/api/ai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'There is severe garbage overflow and illegal dumping in market area pincode 560001 causing health hazards!'
    })
  });
  const data2 = await res2.json();
  console.log('Scenario B Response Status:', res2.status);
  console.log('Scenario B Payload:', JSON.stringify(data2, null, 2));

  console.log('\n--- TEST 3: VERIFY ADMIN DASHBOARD UPDATES ---');
  const overviewRes = await fetch('http://localhost:5000/api/admin/overview');
  const overviewData = await overviewRes.json();
  console.log('Admin Overview Metrics:', JSON.stringify(overviewData, null, 2));

  const clustersRes = await fetch('http://localhost:5000/api/admin/clusters');
  const clustersData = await clustersRes.json();
  console.log('Admin Clusters Count:', clustersData.count);

  const queriesRes = await fetch('http://localhost:5000/api/admin/queries');
  const queriesData = await queriesRes.json();
  console.log('Admin Trending Unique Queries:', JSON.stringify(queriesData, null, 2));
};

runTests().catch(console.error);
