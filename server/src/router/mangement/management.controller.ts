import express from 'express'
import ManagementServices from './management.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()
const managementService = new ManagementServices();

route.get('/:id', (req, res) => {
    managementService.fetchManagements(req, res)
})

route.post('/', (req, res) => {
    managementService.createMangement(req, res)
})

route.put('/:id', (req, res) => {
    managementService.upadteManagementById(req, res)
})

route.delete('/:id', (req, res) => {
    managementService.deleteManageMentbyId(req, res)
})

route.get('/:id', (req, res) => {
    managementService.fetchMangementById(req, res)
})


export default route