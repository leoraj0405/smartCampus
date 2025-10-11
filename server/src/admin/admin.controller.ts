import express from 'express'
import AdminServices from './admi.service';
import { storage } from '../config/fileUpload/file.upload';
import multer from 'multer';
import { jweAuth } from '../middleware/JWE/jweAuth';

const route = express.Router()
const adminService = new AdminServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', jweAuth, (req, res) => {
    adminService.fetchAllAdminsByManagementId(req, res)
})

route.post('/', jweAuth, (req, res) => {
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

route.put('/:id', jweAuth, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        adminService.updateAdminById(req, res)
    });
})

route.delete('/:id', jweAuth, (req, res) => {
    adminService.deleteAdminById(req, res)
})

route.get('/:id', jweAuth, (req, res) => {
    adminService.fetchAdminById(req, res)
})

route.post('/login', (req, res) => {
    adminService.loginAdminByEmail(req, res)
})

export default route