import express from 'express';
const app = express();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
	console.log('microservice listening on PORT:' + PORT);
})