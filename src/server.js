import express from 'express';

// eslint-disable-next-line no-undef
const PORT = process.argv[2] || '3000';

const app = express();

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`);
});
