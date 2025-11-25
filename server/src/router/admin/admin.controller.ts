import express from 'express'
import AdminServices from './admin.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IAdmin } from '../../utils/utils';

const route = express.Router()
const adminService = new AdminServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', authenticateToken, async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<IAdmin[]> = await adminService.fetchAllAdminsByManagementId(managementId)
    if (response.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response.statusCode || 500).json({ error: response.message })
    }
})

route.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        const profileImage = req.file?.filename || null
        const response: IServiceResult<null> = await adminService.createAdmin(req.body, profileImage)
        if (response.statusCode === 201) {
            res.status(201).json({ message: response.message })
        } else {
            res.status(response.statusCode || 500).json({ error: response.message })
        }
    });
})

route.put('/:id', authenticateToken, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        const adminId = req.params.id
        const profileImage = req.file?.filename || null
        const response: IServiceResult<IAdmin> = await adminService.updateAdminById(adminId, { ...req.body }, profileImage)
        if (response?.statusCode === 200) {
            res.status(200).json(response?.data)
        } else {
            res.status(response?.statusCode || 500).json({ error: response?.message || response })
        }
    });
})

route.delete('/:id', authenticateToken, async (req, res) => {
    const adminId = req.params.id
    const response: IServiceResult<null> = await adminService.deleteAdminById(adminId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.get('/:id', authenticateToken, async (req, res) => {
    const adminId = req.params.id
    const response: IServiceResult<IAdmin> = await adminService.fetchAdminById(adminId)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.post('/login', async (req, res) => {
    const { emailId, password } = req.body
    const response: IServiceResult<any> = await adminService.loginAdminByEmail(emailId, password)
    if (response?.statusCode === 200) {
        res.status(200).json({ token: response.token, userData: response.userData })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

export default route