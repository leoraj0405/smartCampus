import { execQuery } from '../../config/database/db.connection'
import { generateUniqueRandomString } from '../../utils/commonFunctions';
import { IServiceResult, IManagement } from '../../utils/utils';

class ManagementServices {
    async fetchManagements(): Promise<IServiceResult<IManagement[]>> {
        const query = `SELECT * FROM management WHERE deletedAt IS NULL`;
        try {
            const fetchManagementResult: any = await execQuery(query, [])
            if (fetchManagementResult.length !== 0) {
                return { statusCode: 200, data: fetchManagementResult, message: '' }
            } else {
                return { statusCode: 404, data: null, message: 'Record not found' }
            }
        } catch (error) {
            return { statusCode: 500, data: null, message: error instanceof Error ? error.message : String(error) }
        }
    }

    async createMangement(body: any): Promise<IServiceResult<null>> {
        const query = `
        INSERT INTO management (
            id,
            name,
            managementType
        ) VALUES (?, ?, ?) `;

        try {
            const { name, managementType } = body
            await execQuery(query, [
                generateUniqueRandomString(),
                name,
                managementType,
            ])
            return { statusCode: 201, message: 'Management created.', data: null }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async upadteManagementById(managementId: string, reqUpdateValue: any): Promise<IServiceResult<any>> {
        try {
            if (Object.keys(reqUpdateValue).length === 0) {
                return { statusCode: 400, message: 'No fields provided for update.', data: null }
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(', ');
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE management 
                SET ${updateValueObj}, updatedAt = CURRENT_TIMESTAMP() 
                WHERE id = ?`;

            const upadteManagement: any = await execQuery(query, [
                ...updateValueData,
                managementId,
            ]);

            if (upadteManagement.affectedRows !== 0) {
                return this.fetchMangementById(managementId)
            } else {
                return { statusCode: 404, message: 'management record not found.', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async deleteManageMentbyId(managementId: string): Promise<IServiceResult<null>> {
        const query = `UPDATE management SET deletedAt = NOW() WHERE id = ?`;
        try {
            const deleteManageMentResult: any = await execQuery(query, [managementId])
            if (deleteManageMentResult.affectedRows !== 0) {
                return { statusCode: 200, message: 'Management deleted successfully.', data: null }
            } else {
                return { statusCode: 404, message: 'Record not found', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async fetchMangementById(managementId: string): Promise<IServiceResult<IManagement>> {
        const query = `SELECT * FROM management WHERE id = ? AND deletedAt IS NULL`;
        try {
            const fetchManagementId: any = await execQuery(query, [managementId])
            if (fetchManagementId.length !== 0) {
                return { statusCode: 200, data: fetchManagementId[0], message: '' }
            } else {
                return { statusCode: 404, data: null, message: 'Record not found' }
            }
        } catch (error) {
            return { statusCode: 500, data: null, message: error instanceof Error ? error.message : String(error) }
        }
    }

    async uploadCampusImages(images: string[], id: string) {
        const query = `UPDATE management SET images = ? where id = ?` 
        try {
            const res: any = await execQuery(query, [JSON.stringify(images), id])
            if(res.affectedRows === 0) {
                return { statusCode: 404, message: 'Record not found', data: null }
            }else {
                const result = this.fetchMangementById(id)
                return result
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

}
export default ManagementServices