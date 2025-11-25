import express from 'express'
import ManagementServices from './management.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import { IServiceResult, IManagement } from '../../utils/utils';

const route = express.Router()
const managementService = new ManagementServices();

route.get('/:id', async (req, res) => {
    const response: IServiceResult<IManagement[]> = await managementService.fetchManagements()
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.post('/', async (req, res) => {
    const response: IServiceResult<null> = await managementService.createMangement(req.body)
    if (response?.statusCode === 201) {
        res.status(201).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.put('/:id', async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<IManagement> = await managementService.upadteManagementById(managementId, req.body)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.delete('/:id', async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<null> = await managementService.deleteManageMentbyId(managementId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.get('/:id', async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<IManagement> = await managementService.fetchMangementById(managementId)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})


export default route