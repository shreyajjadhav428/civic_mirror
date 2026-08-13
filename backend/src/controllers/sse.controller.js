/**
 * GET /api/stream/ai-status
 * Streams processing states to the frontend via Server-Sent Events (SSE).
 */
export const streamAiStatus = (req, res) => {
  // 1. Set required headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // 2. Mocking the AI agentic workflow stages
  const stages = [
    { step: 1, message: "Understanding request..." },
    { step: 2, message: "Identifying relevant departments..." },
    { step: 3, message: "Querying municipal database for projects..." },
    { step: 4, message: "Generating explainable decision..." }
  ];

  let currentStage = 0;

  // 3. Stream updates every 1.5 seconds to simulate processing time
  const intervalId = setInterval(() => {
    if (currentStage < stages.length) {
      const data = JSON.stringify(stages[currentStage]);
      res.write(`data: ${data}\n\n`); // SSE format requires 'data: ... \n\n'
      currentStage++;
    } else {
      res.write(`data: ${JSON.stringify({ step: 5, message: "Complete", done: true })}\n\n`);
      clearInterval(intervalId);
      res.end();
    }
  }, 1500);

  // 4. Clean up if the client drops the connection
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};