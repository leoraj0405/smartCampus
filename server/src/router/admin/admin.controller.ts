import express from 'express'
import AdminServices from './admin.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const adminService = new AdminServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', authenticateToken, (req, res) => {
    adminService.fetchAllAdminsByManagementId(req, res)
})

route.post('/', authenticateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        adminService.createAdmin(req, res)
    });
})

route.put('/:id', authenticateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        adminService.updateAdminById(req, res)
    });
})

route.delete('/:id', authenticateToken, (req, res) => {
    adminService.deleteAdminById(req, res)
})

route.get('/:id', authenticateToken, (req, res) => {
    adminService.fetchAdminById(req, res)
})

route.post('/login', (req, res) => {
    adminService.loginAdminByEmail(req, res)
})

export default route