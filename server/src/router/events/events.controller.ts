import express from 'express';
import EventServices from './events.service';
import { authenticateToken } from '../../middleware/JWE/jweAuth';
import AdminServices from '../admin/admin.service';
import StaffServices from '../staff/staff.service';
import { isValidAudience, isValidEventType } from '../../utils/helper';

const route = express.Router()

const eventSevices = new EventServices();
const adminServices = new AdminServices();
const staffServices = new StaffServices();

// Before fetching events
eventSevices.markCompletedEvents();
eventSevices.markOngoingEvents();

route.get('/', authenticateToken, async (req, res) => {
    const {
        managementId,
        sortBy = 'eventStartDate',
        sortOrder = 'asc'
    } = req.body;

    await eventSevices.markCompletedEvents();
    await eventSevices.markOngoingEvents();

    const response = await eventSevices.fetchEventsByManagementId(
        managementId as string,
        sortBy as string,
        sortOrder as string
    );

    return res.status(response.statusCode).json(response);
});

route.post('/', authenticateToken, async (req, res) => {
    const {
        eventTitle,
        eventDescription,
        eventType,
        targetAudience,
        eventStartDate,
        eventEndDate,
        registrationDeadline,
        venue,
        maxParticipants,
        registrationRequired,
        managementId,
        eventBanner,
        status,
        createdBy
    } = req.body;

    const adminDetails = await adminServices.fetchAdminById(createdBy);
    const staffDetails = await staffServices.fetchStaffbyId(createdBy);
    let createdByName = '';
    if (adminDetails?.data && Object.keys(adminDetails.data).length > 0) {
        createdByName = adminDetails?.data?.fullName
    }

    else if (staffDetails?.data && Object.keys(staffDetails.data).length > 0) {
        createdByName = staffDetails?.data?.fullname
    } else {
        return res.status(401).json({
            statusCode: 401,
            message: 'event created by Invalid user',
            data: []
        })
    }

    const now = new Date();

    if (eventStartDate < now) {
        return res.status(400).json({
            statusCode: 400,
            message: "Event start date cannot be in the past",
            data: []
        });
    }
    if (eventEndDate < now) {
        return res.status(400).json({
            statusCode: 400,
            data: [],
            message: "Event end date cannot be in the past",
        });
    }

    if (registrationDeadline < now) {
        return res.status(400).json({
            statusCode: 400,
            data: [],
            message: "registration deadline cannot be in the past"
        });
    }

    if (!isValidAudience(Number(targetAudience))) {
        return res.status(400).json({
            statusCode: 400,
            data: [],
            message: "Invalid audience type"
        });
    }


    const response = await eventSevices.createEvent(
        eventTitle,
        eventDescription,
        eventType,
        targetAudience,
        eventStartDate,
        eventEndDate,
        registrationDeadline,
        venue,
        maxParticipants,
        registrationRequired,
        managementId,
        eventBanner,
        status,
        createdBy
    )

    if (response.statusCode === 201) {
        return res.status(201).json({
            statusCode: 201,
            message: `Event created by ${createdByName} on ${eventStartDate}`,
            data: []
        })
    } else {
        return res.status(response?.statusCode).json(response)
    }
})

route.delete('/:id/:managementId', authenticateToken, async (req, res) => {
    const eventId = req.params.id
    const managementId = req.params.managementId
    const response = await eventSevices.deleteEventById(eventId, managementId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        return res.status(response.statusCode).json(response);
    }
})

route.get('/:id/:managementId', authenticateToken, async (req, res) => {
    const eventId = req.params.id
    const managementId = req.params.managementId
    const response = await eventSevices.fetchEventById(eventId, managementId)
    if (response?.statusCode === 200) {
        res.status(200).json({ message: response.message })
    } else {
        return res.status(response.statusCode).json(response);
    }
})

export default route;