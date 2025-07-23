const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('--- MINIMAL SERVER TEST IS RUNNING ---');
});

app.listen(PORT, () => {
  console.log(`Minimal server test started on port ${PORT}`);
});
