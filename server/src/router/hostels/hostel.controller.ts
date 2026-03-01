import express from 'express';
import HostelServices from './hostel.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';

const route = express.Router()

const hostelService = new HostelServices();

route.get('/:managementId', authenticateToken, async (req, res) => {
    const id: string = req.params.managementId
    const response = await hostelService.fetchHostelsByManagement(id)
    if (response.statusCode === 200) {
        return res.status(200).json(response)
    } else {
        return res.status(response.statusCode).json(response)
    }
});

route.post('/',authenticateToken, async (req, res) => {
    const {
        hostelName,
        hostelType,
        totalFloors,
        totalCapacity,
        totalRooms,
        managementId,
        wardenIds,
        director,
    } = req.body;

    const response = await hostelService.createHostel(
        hostelName,
        hostelType,
        totalFloors,
        totalCapacity,
        totalRooms,
        managementId,
        JSON.stringify(wardenIds),
        director,
    )

    return res.status(response.statusCode).json(response);

});

route.delete('/:id/:managementId', authenticateToken, async (req, res) => {
    const hostelId = req.params.id
    const managementId = req.params.managementId
    const response = await hostelService.deleteHostel(hostelId, managementId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        return res.status(response.statusCode).json(response);
    }
});

route.get('/:id/:managementId', authenticateToken, async (req, res) => {
    const hostelId = req.params.id
    const managementId = req.params.managementId
    const response = await hostelService.fetchHostelById(hostelId, managementId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        return res.status(response.statusCode).json(response);
    }
});

route.put('/:eventId/:managementId', authenticateToken, async (req, res) => {
    const managementId = req.params.managementId;
    const hostelId = req.params.eventId
    const response = await hostelService.updateHostel(hostelId, managementId, req.body)
    if (response?.statusCode === 200) {
        res.status(200).json(response.data)
    } else {
        res.status(response?.statusCode || 500).json({ error: response?.message || response })
    }
})

export default route;