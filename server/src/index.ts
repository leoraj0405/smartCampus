import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cros from 'cors';
dotenv.config();

//Routes
import adminController from './router/admin/admin.controller';
import managementController from './router/mangement/management.controller';
import staffController from './router/staff/staff.controller';
import departmentController from './router/department/department.controller';
import studentController from './router/student/student.controller';

import path from 'path';

const app = express();
const PORT = process.env.SERVER_PORT || 3200;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cros({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/', adminController)
app.use('/api/management/', managementController)
app.use('/api/staff/', staffController)
app.use('/api/department/', departmentController);
app.use('/api/students/', studentController)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
