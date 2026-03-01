import express from 'express'
import ManagementServices from './management.service';
import { IServiceResult, IManagement } from '../../utils/utils';
import multer from 'multer';
import { storage } from '../../config/fileUpload/file.upload';

const route = express.Router()
const managementService = new ManagementServices();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }
}).array('images', 3)

route.get('/', async (req, res) => {
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
    const response: IServiceResult<IManagement | null> = await managementService.upadteManagementById(managementId, req.body)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

route.get('/:id', async (req, res) => {
    const managementId = req.params.id
    const response: IServiceResult<IManagement | null> = await managementService.fetchMangementById(managementId)
    if (response?.statusCode === 200) {
        res.status(200).json(response)
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


route.post('/:id', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err })
        } else {
            const managementId = req.params.id
            const files = req.files as Express.Multer.File[];
            const imagesArr = files?.map((file: Express.Multer.File) => file.filename)
            const response: IServiceResult<IManagement | null> = await managementService.uploadCampusImages(imagesArr, managementId)
            if (response?.statusCode === 200) {
                res.status(200).json(response.data)
            } else {
                res.status(response?.statusCode || 500).json({ error: response?.message || response })
            }
        }
    })
})


export default route