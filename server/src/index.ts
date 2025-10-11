import express from 'express';
import adminController from  './admin/admin.controller'
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3200;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/', adminController)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
