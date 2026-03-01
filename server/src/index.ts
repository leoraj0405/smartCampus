import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cros from 'cors';
import morgan from 'morgan';
dotenv.config();

//Routes
import adminController from './router/admin/admin.controller';
import managementController from './router/mangement/management.controller';
import staffController from './router/staff/staff.controller';
import departmentController from './router/department/department.controller';
import studentController from './router/student/student.controller';
import eventsController from './router/events/events.controller';
import hostelController from './router/hostels/hostel.controller';

import path from 'path';

const app = express();
const PORT = process.env.SERVER_PORT || 3200;
const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL

app.use(express.json());
app.use(bodyParser.json());
// HTTP request logging for all endpoints
app.use(morgan('combined'));
// Additional production line log for every API request
app.use((req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`PROD_LOG: ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  }
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cros({
  origin: FRONT_END_BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/', adminController)
app.use('/api/management/', managementController)
app.use('/api/staff/', staffController)
app.use('/api/department/', departmentController)
app.use('/api/students/', studentController)
app.use('/api/events/', eventsController)
app.use('/api/hostels', hostelController)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
