Backend: Application server → npm start
Simulation: Order processing → node server.js
Frontend: Frontend → npm run dev


Quick health checks
netstat -ano | Select-String ":5000" → listening
netstat -ano | Select-String ":5001" → listening
netstat -ano | Select-String ":5173" → listening


Open browser: http://localhost:5173/


After modifying the seed.js 
Stop the Application Server
node seed.js
npm start