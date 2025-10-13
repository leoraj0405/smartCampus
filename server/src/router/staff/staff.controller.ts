import express from 'express'
import StaffServices from './staff.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const staffService = new StaffServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', (req, res) => {
    staffService.fetchStaffByManagementId(req, res)
})

route.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        staffService.createStaff(req, res)
    });
})

route.put('/:id', authenticateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        staffService.updateStaffById(req, res)
    });
})

route.delete('/:id', authenticateToken, (req, res) => {
    staffService.deleteStaffById(req, res)
})

route.get('/:id', authenticateToken, (req, res) => {
    staffService.fetchStaffbyId(req, res)
})

route.post('/login', (req, res) => {
    staffService.loginStaffByEmail(req, res)
})

export default route