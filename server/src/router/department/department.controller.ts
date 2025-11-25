import express from 'express'
import DepartmentServices from './department.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IDepartment } from '../../utils/utils';

const route = express.Router()
const departmentService = new DepartmentServices();

route.get('/:id', async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<IDepartment[]> = await departmentService.fetchDepartmentsByMangementId(managementId)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.post('/', async (req, res) => {
    const response: IServiceResult<null> = await departmentService.createDepartment(req.body)
    if (response?.statusCode === 201) {
        res.status(201).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.put('/:id', async (req, res) => {
    const departmentId = req.params.id
    const response: IServiceResult<IDepartment> = await departmentService.updateDepartmentById(departmentId, req.body)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.delete('/:id', async (req, res) => {
    const departmentId = req.params.id
    const response: IServiceResult<null> = await departmentService.deleteDepartmentById(departmentId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.get('/:id', async (req, res) => {
    const departmentId = req.params.id
    const response: IServiceResult<IDepartment> = await departmentService.fetchDepartmentById(departmentId)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})


export default route