import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config();

//Routes
import adminController from './router/admin/admin.controller';
import managementController from './router/mangement/management.controller';
import staffController from './router/staff/staff.controller';

const app = express();
const PORT = process.env.SERVER_PORT || 3200;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/', adminController)
app.use('/api/management/', managementController)
app.use('/api/staff/', staffController)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
