import { execQuery } from '../../config/database/db.connection'
import { generateUniqueRandomString } from '../../utils/commonFunctions';
import { IServiceResult, IManagement, IManagementCreate } from '../../utils/utils';

class ManagementServices {
    async fetchManagements(): Promise<IServiceResult<IManagement[]>> {
        const query = `SELECT * FROM management WHERE deletedAt IS NULL`;
        try {
            const fetchManagementResult = await execQuery(query, []) as IManagement[]
            if (fetchManagementResult && fetchManagementResult.length !== 0) {
                return { statusCode: 200, data: fetchManagementResult, message: '' }
            } else {
                return { statusCode: 404, data: null, message: 'Record not found' }
            }
        } catch (error) {
            return { statusCode: 500, data: null, message: error instanceof Error ? error.message : String(error) }
        }
    }

    async createMangement(body: IManagementCreate): Promise<IServiceResult<null>> {
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
                managementType || '',
            ])
            return { statusCode: 201, message: 'Management created.', data: null }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async upadteManagementById(managementId: string, reqUpdateValue: Record<string, string | number | boolean | null>): Promise<IServiceResult<IManagement | null>> {
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

            const upadteManagement = await execQuery(query, [
                ...updateValueData,
                managementId,
            ]);
            const updateResult = upadteManagement as { affectedRows?: number };
            if (updateResult.affectedRows && updateResult.affectedRows !== 0) {
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
            const deleteManageMentResult = await execQuery(query, [managementId])
            const result = deleteManageMentResult as { affectedRows?: number };
            if (result.affectedRows && result.affectedRows !== 0) {
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
            const fetchManagementId = await execQuery(query, [managementId]) as IManagement[]
            if (fetchManagementId && fetchManagementId.length !== 0) {
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
            const res = await execQuery(query, [JSON.stringify(images), id])
            const resultRes = res as { affectedRows?: number };
            if(!resultRes.affectedRows || resultRes.affectedRows === 0) {
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