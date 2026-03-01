import { execQuery } from "../../config/database/db.connection"
import { generateUniqueRandomString } from "../../utils/commonFunctions";
import { IEvents } from '../../utils/utils';

class EventServices {
    async fetchEventsByManagementId(managementId: string, sortBy: string, sortOrder: string) {
        const allowedSortColumns = ["eventStartDate", "createdAt", "status"];
        const allowedSortOrders = ["ASC", "DESC"];

        const safeSortBy = allowedSortColumns.includes(sortBy)
            ? sortBy
            : "eventStartDate";

        const safeSortOrder = allowedSortOrders.includes(sortOrder?.toUpperCase())
            ? sortOrder.toUpperCase()
            : "ASC";

        const FETCH_QUERY = `
            SELECT *
            FROM events
            WHERE managementId = ?
                AND deletedAt IS NULL
            ORDER BY ${safeSortBy} ${safeSortOrder};
            `;
        try {
            const response = await execQuery(FETCH_QUERY, [managementId, sortBy, sortOrder]) as IEvents[]
            if (response && response.length > 0) {
                return {
                    statusCode: 200,
                    message: '',
                    data: {
                        events: response,
                        sortBy,
                        sortOrder
                    },
                }
            } else {
                return {
                    statusCode: 404,
                    message: 'data not founded',
                    data: [],
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: [],
            };
        }
    }

    async createEvent(
        eventTitle: string,
        eventDescription: string,
        eventType: string,
        targetAudience: string,
        eventStartDate: string,
        eventEndDate: string,
        registrationDeadline: string,
        venue: string,
        maxParticipants: number,
        registrationRequired: boolean,
        managementId: string,
        eventBanner: string,
        status: string,
        createdBy: string
    ) {
        const INSERT_QUERY = `INSERT INTO events (
            id,
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
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );`
        try {

            const eventId = generateUniqueRandomString();
            const postArray = [
                eventId,
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
            ]
            const response = await execQuery(INSERT_QUERY, postArray)
            const ir = response as { affectedRows?: number };
            if (ir.affectedRows === 1) {
                return {
                    statusCode: 201,
                    message: 'event created.',
                    data: [],
                };
            } else {
                return {
                    statusCode: 500,
                    message: 'event not created.',
                    data: [],
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: [],
            };
        }
    }

    // Mark Completed Events
    async markCompletedEvents() {
        const UPDATE_COMPLETED_QUERY = `
      UPDATE events
      SET status = '3'
      WHERE eventEndDate < NOW()
        AND status != '3'
        AND status != '4'
        AND deletedAt IS NULL;
    `;

        try {
            const result = await execQuery(UPDATE_COMPLETED_QUERY);
            const rr = result as { affectedRows?: number };
            return {
                success: true,
                affectedRows: rr.affectedRows
            };

        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : String(error)
            );
        }
    }

    // Mark Ongoing Events
    async markOngoingEvents() {
        const UPDATE_ONGOING_QUERY = `
      UPDATE events
      SET status = '2'
      WHERE eventStartDate <= NOW()
        AND eventEndDate >= NOW()
        AND status = '1'
        AND deletedAt IS NULL;
    `;

        try {
            const result = await execQuery(UPDATE_ONGOING_QUERY);
            const rr = result as { affectedRows?: number };
            return {
                success: true,
                affectedRows: rr.affectedRows
            };

        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : String(error)
            );
        }
    }

    async deleteEventById(eventId: string, managementId: string) {
        const query = `UPDATE events SET deletedAt = NOW(), status = "4" WHERE id = ? AND managementId = ? `;
        try {
            const response = await execQuery(query, [eventId, managementId])
            const dr = response as { affectedRows?: number };
            if (dr.affectedRows && dr.affectedRows !== 0) {
                return { statusCode: 200, message: 'event deleted successfully.', data: null };
            } else {
                return { statusCode: 404, message: 'Record not found', data: null };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async fetchEventById(eventId: string, managementId: string) {
        const query = `SELECT * FROM events  WHERE id = ? AND managementId = ? AND deletedAt IS NULL `;
        try {
            const response = await execQuery(query, [eventId, managementId]) as IEvents[]
            if (response && response.length !== 0) {
                return { statusCode: 200, message: '', data: response[0] };
            } else {
                return { statusCode: 404, message: 'Record not found', data: null };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async updateEvents(eventId: string, managementId: string, reqUpdateValue: Record<string, string | number | boolean | null>) {
        try {
            if (Object.keys(reqUpdateValue).length === 0) {
                return { statusCode: 400, message: 'No fields provided for update.', data: null }
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(', ');
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE events 
                    SET ${updateValueObj}, updatedAt = CURRENT_TIMESTAMP() 
                    WHERE id = ? AND managementId = ?`;

            const upadteManagement = await execQuery(query, [
                ...updateValueData,
                eventId,
                managementId,
            ]);

            const ur = upadteManagement as { affectedRows?: number };
            if (ur.affectedRows && ur.affectedRows !== 0) {
                return this.fetchEventById(eventId, managementId)
            } else {
                return { statusCode: 404, message: 'event record not found.', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }
}

export default EventServices