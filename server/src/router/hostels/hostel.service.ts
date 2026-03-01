import { execQuery } from "../../config/database/db.connection"
import { generateUniqueRandomString } from "../../utils/commonFunctions";

class HostelServices {
    async fetchHostelsByManagement(managementId: string) {
        const FETCH_QUERY = `
            SELECT 
                hos.id, 
                hos.HostelName, 
                hos.HostelType, 
                hos.totalCapacity, 
                hos.managementId, 
                hos.wardenIds, 
                hos.director,
                sta.fullname
            FROM hostels AS hos
            JOIN staff AS sta 
                ON hos.director = sta.id
            WHERE hos.managementId = ? AND hos.deletedAt IS NULL
        `;
        try {
            const response = await execQuery(FETCH_QUERY, [managementId]) as object[]
            if (!response || response.length === 0) {
                return {
                    statusCode: 404,
                    message: 'Hostels details not founded.',
                    data: []
                }
            } else {
                return {
                    statusCode: 200,
                    message: '',
                    data: response
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: []
            }
        }
    }

    async createHostel(
        hostelName: string,
        hostelType: string,
        totalFloors: number,
        totalCapacity: number,
        totalRooms: number,
        managementId: string,
        wardenIds: string,
        director: string,
    ) {
        const INSERT_QUERY = `
            INSERT INTO hostels (
                id,
                hostelName,
                hostelType,
                totalFloors,
                totalCapacity,
                totalRooms,
                managementId,
                wardenIds,
                director
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const id: string = generateUniqueRandomString()
        try {
            const response = await execQuery(INSERT_QUERY, [
                id,
                hostelName,
                hostelType,
                totalFloors,
                totalCapacity,
                totalRooms,
                managementId,
                wardenIds,
                director
            ]);
            const ir = response as { affectedRows?: number };
            if (ir.affectedRows === 1) {
                return {
                    statusCode: 201,
                    message: 'Hostel Created',
                    data: []
                }
            } else {
                return {
                    statusCode: 500,
                    message: 'something went wrong.',
                    data: []
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: []
            }
        }
    }
    async deleteHostel(hostelId: string, managementId: string) {
        const query = `UPDATE hostels SET deletedAt = NOW() WHERE id = ? AND managementId = ? `;
        try {
            const response = await execQuery(query, [hostelId, managementId])
            const dr = response as { affectedRows?: number };
            if (dr.affectedRows && dr.affectedRows !== 0) {
                return { statusCode: 200, message: 'hostel deleted successfully.', data: [] };
            } else {
                return { statusCode: 404, message: 'Record not found', data: [] };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: [] };
        }
    }

    async fetchHostelById(hostelId: string, managementId: string) {
        const query = `SELECT * FROM hostels  WHERE id = ? AND managementId = ? AND deletedAt IS NULL `;
        try {
            const response = await execQuery(query, [hostelId, managementId]) as object[]
            if (response && response.length !== 0) {
                return { statusCode: 200, message: '', data: response[0] };
            } else {
                return { statusCode: 404, message: 'Record not found', data: [] };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }
    async updateHostel(eventId: string, managementId: string, reqUpdateValue: Record<string, string | number | boolean | null>) {
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
                return this.fetchHostelById(eventId, managementId)
            } else {
                return { statusCode: 404, message: 'hostel record not found.', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }
}

export default HostelServices