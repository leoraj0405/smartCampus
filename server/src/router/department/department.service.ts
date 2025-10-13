import { Request, Response } from 'express';
import { execQuery } from '../../config/database/db.connection'
import { generateUniqueRandomString } from '../../utils/commonFunctions';

class DepartmentServices {
    async fetchDepartmentsByMangementId(req: Request, res: Response) {
        const query = `SELECT * FROM department WHERE managementId = ? deletedAt IS NULL`;
        try {
            const managementId = req.params.id
            const departmentResponse: any = await execQuery(query, [managementId])
            if (departmentResponse.length !== 0) {
                return res.status(200).send(departmentResponse)
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async createDepartment(req: Request, res: Response) {
        const query = `
        INSERT INTO department (
            id,
            name,
            managementId
        ) VALUES (?, ?, ?) `;

        try {
            const {
                name,
                managementId,
            } = req.body

            await execQuery(query, [
                generateUniqueRandomString(),
                name,
                managementId,
            ])
            return res.status(201).send('Department created.')
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async updateDepartmentById(req: Request, res: Response) {
        try {
            const departmentId = req.params.id;
            const reqUpdateValue = { ...req.body };

            if (Object.keys(reqUpdateValue).length === 0) {
                return res.status(400).send("No fields provided for update.");
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(", ");
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE department 
                SET ${updateValueObj}, updatedAt = CURRENT_TIMESTAMP() 
                WHERE id = ?`;

            const departmentResponse: any = await execQuery(query, [
                ...updateValueData,
                departmentId,
            ]);

            if (departmentResponse.affectedRows !== 0) {
                this.fetchDepartmentById(req, res)
            } else {
                return res.status(404).send("management record not found.");
            }
        } catch (error) {
            return res.status(500).send(`Server Error: ${error}`);
        }
    }

    async deleteDepartmentById(req: Request, res: Response) {
        const query = `UPDATE department SET deletedAt = NOW() WHERE id = ?`;
        try {
            const departmentId = req.params.id
            const departmentResponse: any = await execQuery(query, [departmentId])
            if (departmentResponse.affectedRows !== 0) {
                return res.status(200).send('department deleted successfully.')
            } else {
                return res.status(404).send('Record not founded')
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async fetchDepartmentById(req: Request, res: Response) {
        const query = `SELECT * FROM department WHERE id = ? AND deletedAt IS NULL`;
        try {
            const departmentId = req.params.id
            const departmentResponse: any = await execQuery(query, [departmentId])
            if (departmentResponse.length !== 0) {
                return res.status(200).send(departmentResponse[0])
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

}
export default DepartmentServices