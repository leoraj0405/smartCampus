import express from 'express'
import StaffServices from './staff.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IStaff } from '../../utils/utils';

const route = express.Router()
const staffService = new StaffServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', async (req, res) => {
    const managementId = req.params.id
    const { limit = 10, page = 1, searchTerm = '', searchBy = 'fullName', searchType = 'contains' } = req.body || {}
    const response: IServiceResult<any> = await staffService.fetchStaffByManagementId(managementId, { limit, page, searchTerm, searchBy, searchType })
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        const profileImage = req.file.filename || null
        const response: IServiceResult<null> = await staffService.createStaff(req.body, profileImage)
        if (response?.statusCode === 201) {
            res.status(201).json({ message: response.message })
        } else {
            res.status(response?.statusCode || 500).json({ error: response?.message || response })
        }
    });
})

route.put('/:id', authenticateToken, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        const staffId = req.params.id
        const profileImage = req.file?.filename || null
        const response: IServiceResult<IStaff> = await staffService.updateStaffById(staffId, { ...req.body }, profileImage)
        if (response?.statusCode === 200) {
            res.status(200).json(response.data)
        } else {
            res.status(response?.statusCode || 500).json({ error: response?.message || response })
        }
    });
})

route.delete('/:id', authenticateToken, async (req, res) => {
    const staffId = req.params.id
    const response: IServiceResult<null> = await staffService.deleteStaffById(staffId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.get('/:id', authenticateToken, async (req, res) => {
    const staffId = req.params.id
    const response: IServiceResult<IStaff> = await staffService.fetchStaffbyId(staffId)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.post('/login', async (req, res) => {
    const { emailId, password } = req.body
    const response: IServiceResult<any> = await staffService.loginStaffByEmail(emailId, password)
    if (response?.statusCode === 200) {
        res.status(200).json({ token: response.token, userData: response.userData })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

export default route