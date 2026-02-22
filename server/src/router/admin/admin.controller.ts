import express from 'express'
import AdminServices from './admin.service';
import { storage } from '../../config/fileUpload/file.upload';
import multer from 'multer';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IAdmin, IManagement, IDepartment } from '../../utils/utils';
import ManagementServices from '../mangement/management.service';
import DepartmentServices from '../department/department.service';
import Studentservices from '../student/student.service';
import StaffServices from '../staff/staff.service';

const route = express.Router()
const adminService = new AdminServices();
const managementService = new ManagementServices();
const departmentService = new DepartmentServices();
const studentsServices = new Studentservices();
const staffService = new StaffServices();


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

route.post('/overview', authenticateToken, async (req, res) => {
    const {
        managementId,
        adminId
    } = req.body;
    const response = {
        managementData: {},
        userData: {},
        departmentData: {},
        students: {},
        staffs: {}
    }
    const { limit = 10, page = 1, searchTerm = '', searchBy = 'fullName', searchType = 'contains' } = req.body || {}

    const adminData: IServiceResult<IAdmin> = await adminService.fetchAdminById(adminId)
    const managementData: IServiceResult<IManagement> = await managementService.fetchMangementById(managementId)
    const departmentData: IServiceResult<IDepartment[]> = await departmentService.fetchDepartmentsByMangementId(managementId)
    const studentData: IServiceResult<any> = await studentsServices.fetchStudentsByManagementId({
        managementId,
        limit: 10,
        page: 1,
        searchTerm: '',
        searchBy: 'fullName',
        searchType: 'contains'
    })
    const staffData: IServiceResult<any> = await staffService.fetchStaffByManagementId(managementId, { limit, page, searchTerm, searchBy, searchType })

    if (managementData.statusCode === 200) {
        response.managementData = managementData?.data || {}
    }
    if (departmentData?.statusCode === 200) {
        response.departmentData = departmentData?.data || []
    }
    if (adminData?.statusCode === 200) {
        response.userData = adminData?.data || {}
    }
    if (studentData?.statusCode === 200) {
        response.students = studentData?.data
    }
    if(staffData?.statusCode === 200) {
        response.staffs = staffData?.data
    }
    if (managementData?.statusCode !== 200 || departmentData?.statusCode !== 200) {
        const statusCode = managementData?.statusCode || departmentData?.statusCode || adminData?.statusCode || studentData?.statusCode || staffData?.statusCode || 500
        const error = managementData?.message || departmentData?.message || adminData?.message || studentData?.message || staffData?.message ||  'something went wrong try again.'
        return res.status(statusCode).json({
            message: error
        })
    }
    return res.status(200).send(response)
})

export default route