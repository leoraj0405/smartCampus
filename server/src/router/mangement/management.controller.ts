import express from 'express'
import ManagementServices from './management.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const managementService = new ManagementServices();

route.get('/:id', authenticateToken, (req, res) => {
    managementService.fetchManagements(req, res)
})

route.post('/', authenticateToken, (req, res) => {
    managementService.createMangement(req, res)
})

route.put('/:id', authenticateToken, (req, res) => {
    managementService.upadteManagementById(req, res)
})

route.delete('/:id', authenticateToken, (req, res) => {
    managementService.deleteManageMentbyId(req, res)
})

route.get('/:id', authenticateToken, (req, res) => {
    managementService.fetchMangementById(req, res)
})


export default route