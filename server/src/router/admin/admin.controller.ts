import express from 'express'
import AdminServices from './admin.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IAdmin, IManagement } from '../../utils/utils';
import ManagementServices from '../mangement/management.service';

const route = express.Router()
const adminService = new AdminServices();
const managementService = new ManagementServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 } // 2MB file size limit
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

route.post('/overview', async (req, res) => {
    const { 
        managementId, 
        adminId 
    } = req.body;
    const response = {
        managementData: {},
        userData: {} 
    }
    const managementData: IServiceResult<IManagement> = await managementService.fetchMangementById(managementId)
    if (managementData.statusCode === 200) {
        response.managementData = {
            managementId: managementData.data?.id,
            name: managementData.data?.name,
            images: managementData.data?.images,
            about: managementData?.data?.about
        }
    } else {
        return res.status(managementData.statusCode).json({
            error: managementData.error,
            message: managementData.message
        })
    }
    
    return res.status(200).send(response)
})

export default route