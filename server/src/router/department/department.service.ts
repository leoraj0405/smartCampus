import { execQuery } from '../../config/database/db.connection'
import { generateUniqueRandomString } from '../../utils/commonFunctions';
import { IServiceResult, IDepartment, IDepartmentCreate } from '../../utils/utils';

class DepartmentServices {
    async fetchDepartmentsByMangementId(managementId: string): Promise<IServiceResult<IDepartment[]>> {
        const query = `SELECT * FROM department WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            const departmentResponse = await execQuery(query, [managementId]) as IDepartment[]
            if (departmentResponse && departmentResponse.length !== 0) {
                return { statusCode: 200, data: departmentResponse, message: '' }
            } else {
                return { statusCode: 404, data: [], message: 'Record not found' }
            }
        } catch (error) {
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) }
        }
    }

    async createDepartment(body: IDepartmentCreate): Promise<IServiceResult<null>> {
        const query = `
        INSERT INTO department (
            id,
            name,
            managementId
        ) VALUES (?, ?, ?) `;

        try {
            const { name, managementId } = body

            await execQuery(query, [
                generateUniqueRandomString(),
                name,
                managementId,
            ])
            return { statusCode: 201, message: 'Department created.', data: null }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async updateDepartmentById(departmentId: string, reqUpdateValue: Record<string, string | number | boolean | null>): Promise<IServiceResult<IDepartment | null>> {
        try {
            if (Object.keys(reqUpdateValue).length === 0) {
                return { statusCode: 400, message: 'No fields provided for update.', data: null }
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(', ');
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE department 
                SET ${updateValueObj}, updatedAt = CURRENT_TIMESTAMP() 
                WHERE id = ?`;

            const departmentResponse = await execQuery(query, [
                ...updateValueData,
                departmentId,
            ]);

            const ur = departmentResponse as { affectedRows?: number };
            if (ur.affectedRows && ur.affectedRows !== 0) {
                return this.fetchDepartmentById(departmentId)
            } else {
                return { statusCode: 404, message: 'department record not found.', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async deleteDepartmentById(departmentId: string) {
        const query = `UPDATE department SET deletedAt = NOW() WHERE id = ?`;
        try {
            const departmentResponse = await execQuery(query, [departmentId])
            const dr = departmentResponse as { affectedRows?: number };
            if (dr.affectedRows && dr.affectedRows !== 0) {
                return { statusCode: 200, message: 'department deleted successfully.', data: null }
            } else {
                return { statusCode: 404, message: 'Record not found', data: null }
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null }
        }
    }

    async fetchDepartmentById(departmentId: string) {
        const query = `SELECT * FROM department WHERE id = ? AND deletedAt IS NULL`;
        try {
            const departmentResponse = await execQuery(query, [departmentId]) as IDepartment[]
            if (departmentResponse && departmentResponse.length !== 0) {
                return { statusCode: 200, data: departmentResponse[0], message: '' }
            } else {
                return { statusCode: 404, data: null, message: 'Record not found' }
            }
        } catch (error) {
            return { statusCode: 500, data: null, message: error instanceof Error ? error.message : String(error) }
        }
    }

}
export default DepartmentServices