import express from 'express'
import DepartmentServices from './department.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const departmentService = new DepartmentServices();

route.get('/:id', (req, res) => {
    departmentService.fetchDepartmentsByMangementId(req, res)
})

route.post('/', (req, res) => {
    departmentService.createDepartment(req, res)
})

route.put('/:id', (req, res) => {
    departmentService.updateDepartmentById(req, res)
})

route.delete('/:id', (req, res) => {
    departmentService.deleteDepartmentById(req, res)
})

route.get('/:id', (req, res) => {
    departmentService.fetchDepartmentById(req, res)
})


export default route