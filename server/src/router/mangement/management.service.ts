import { Request, Response } from 'express';
import { execQuery } from '../../config/database/db.connection'
import { generateUniqueRandomString } from '../../utils/commonFunctions';

class ManagementServices {
    async fetchManagements(req: Request, res: Response) {
        const query = `SELECT * FROM management deletedAt IS NULL`;
        try {
            const managementId = req.params.id
            const fetchManagementResult: any = await execQuery(query, [managementId])
            if (fetchManagementResult.length !== 0) {
                return res.status(200).send(fetchManagementResult)
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async createMangement(req: Request, res: Response) {
        const query = `
        INSERT INTO management (
            id,
            name,
            managementType,
        ) VALUES (?, ?, ?) `;

        try {
            const {
                name,
                managementType,
            } = req.body

            const insetManagementResult = await execQuery(query, [
                generateUniqueRandomString(),
                name,
                managementType,
            ])
            return res.status(201).send('Management created.')
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async upadteManagementById(req: Request, res: Response) {
        try {
            const managementId = req.params.id;
            const reqUpdateValue = { ...req.body };

            if (Object.keys(reqUpdateValue).length === 0) {
                return res.status(400).send("No fields provided for update.");
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(", ");
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE management SET ${updateValueObj} WHERE id = ?`;

            const upadteManagement: any = await execQuery(query, [
                ...updateValueData,
                managementId,
            ]);

            if (upadteManagement.affectedRows !== 0) {
                this.fetchMangementById(req, res)
            } else {
                return res.status(404).send("management record not found.");
            }
        } catch (error) {
            return res.status(500).send(`Server Error: ${error}`);
        }
    }

    async deleteManageMentbyId(req: Request, res: Response) {
        const query = `UPDATE management SET deletedAt = NOW() WHERE id = ?`;
        try {
            const managementId = req.params.id
            const deleteManageMentResult: any = await execQuery(query, [managementId])
            if (deleteManageMentResult.affectedRows !== 0) {
                return res.status(200).send('Management deleted successfully.')
            } else {
                return res.status(404).send('Record not founded')
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async fetchMangementById(req: Request, res: Response) {
        const query = `SELECT * FROM management WHERE id = ? AND deletedAt IS NULL`;
        try {
            const managementId = req.params.id
            const fetchAllAdminByManagementId: any = await execQuery(query, [managementId])
            if (fetchAllAdminByManagementId.length !== 0) {
                return res.status(200).send(fetchAllAdminByManagementId[0])
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

}
export default ManagementServices