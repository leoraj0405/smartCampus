import express from 'express'
import Studentservices from './student.service';
import { IServiceResult } from '../../utils/utils';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const studentsServices = new Studentservices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('profileImage');

route.get('/:id', async (req, res) => {
    const managementId = req.params.id
    const {
        limit = 10,
        page = 1,
        searchTerm = '',
        searchBy = 'fullName',
        searchType = 'contains' // 'startWith', 'endWith', 'exact', 'contains', 'not contains'
    } = req.body;

    const response: IServiceResult<any> = await studentsServices.fetchStudentsByManagementId({
        managementId,
        limit,
        page,
        searchTerm,
        searchBy,
        searchType
    })
    if (response.statusCode === 200) {
        res.status(200).json({ result: response.data })
    } else {
        res.status(response.statusCode).json({ result: response.data, message: response.message })
    }
})

route.post('/', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const profileImage = req?.file?.filename || null
        const response: IServiceResult<null> = await studentsServices.createStudent(req.body, profileImage)
        if (response.statusCode === 201) {
            res.status(201).json({ message: response.message })
        } else {
            res.status(response.statusCode).json({ message: response.message })
        }
    });

})

route.put('/:id', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const studentId = req.params.id
        const profileImage = req?.file?.filename || null
        const response: IServiceResult<any> = await studentsServices.updateStudentById(studentId, { ...req.body }, profileImage)
        if (response?.statusCode === 200) {
            res.status(200).json(response?.data)
        } else {
            res.status(response?.statusCode || 500).json({ message: response?.message || response })
        }
    });
})

route.delete('/:id', async (req, res) => {
    const studentId = req.params.id
    const response: IServiceResult<any> = await studentsServices.deleteStudentById(studentId)
    if (response?.statusCode === 200) {
        res.status(200).json(response?.data)
    } else {
        res.status(response?.statusCode || 500).json({ message: response?.message || response })
    }
})

route.get('/:id', async (req, res) => {
    const studentId = req.params.id
    const response: IServiceResult<any> = await studentsServices.fetchStudentbyId(studentId)
    if (response?.statusCode === 200) {
        res.status(200).json(response?.data)
    } else {
        res.status(response?.statusCode || 500).json({ message: response?.message || response })
    }
})

route.post('/login', async (req, res) => {
    const email = req.body.emailId;
    const password = req.body.password;

    const response: IServiceResult<any> = await studentsServices.loginStudentByEmail(email, password)
    if (response.statusCode === 200) {
        res.status(200).json({ token: response.token, userData: response.userData })
    } else {
        res.status(response?.statusCode || 500).json({ message: response?.message || response })
    }
})

export default route