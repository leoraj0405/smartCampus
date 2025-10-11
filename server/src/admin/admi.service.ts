import { Request, Response } from 'express';
import { execQuery } from '../config/database/db.connection'
import HashService from '../utils/password.hash';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import dotenv from 'dotenv';
import { generateUniqueRandomString, pemToArrayBuffer } from '../utils/commonFunctions';
dotenv.config();


const hashService = new HashService()

class AdminServices {
    async fetchAllAdminsByManagementId(req: Request, res: Response) {
        const query = `SELECT * FROM admin WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            const managementId = req.params.id
            const fetchAdminResult: any = await execQuery(query, [managementId])
            if (fetchAdminResult.length !== 0) {
                return res.status(200).send(fetchAdminResult)
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async createAdmin(req: Request, res: Response) {
        const query = `
        INSERT INTO admin (
            id,
            firstName,
            lastName,
            fullName,
            emailId,
            password,
            status,
            profileImage,
            phoneNumber,
            managementId,
            slatWord
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

        try {
            const {
                firstName,
                lastName,
                emailId,
                password,
                status,
                managementId,
                phoneNumber,
            } = req.body

            if (!req.file) return res.status(400).send("No file uploaded.");
            const randomWord = crypto.randomBytes(15).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            const fullName = `${firstName} ${lastName}`
            const hashedPassword = hashService.hashPassword(password + randomWord)
            const profileImage = req.file.filename

            const insertAdminResult = await execQuery(query, [
                generateUniqueRandomString(),
                firstName,
                lastName,
                fullName,
                emailId,
                hashedPassword,
                status,
                profileImage,
                phoneNumber,
                managementId,
                randomWord
            ])
            return res.status(201).send('Admin created.')
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async updateAdminById(req: Request, res: Response) {
        try {
            const adminId = req.params.id;
            const reqUpdateValue = { ...req.body };

            if (req.file) {
                reqUpdateValue.profileImage = req.file.filename;
            }

            if (Object.keys(reqUpdateValue).length === 0) {
                return res.status(400).send("No fields provided for update.");
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(", ");
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE admin SET ${updateValueObj} WHERE id = ?`;

            const updateAdminResult: any = await execQuery(query, [
                ...updateValueData,
                adminId,
            ]);

            if (updateAdminResult.affectedRows !== 0) {
                this.fetchAdminById(req, res)
            } else {
                return res.status(404).send("Admin record not found.");
            }
        } catch (error) {
            console.error("Update error:", error);
            return res.status(500).send(`Server Error: ${error}`);
        }
    }

    async deleteAdminById(req: Request, res: Response) {
        const query = `UPDATE admin SET deletedAt = NOW() WHERE id = ?`;
        try {
            const adminId = req.params.id
            const deleteAdminResult: any = await execQuery(query, [adminId])
            if (deleteAdminResult.affectedRows !== 0) {
                return res.status(200).send('Admin deleted successfully.')
            } else {
                return res.status(404).send('Record not founded')
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async fetchAdminById(req: Request, res: Response) {
        const query = `SELECT * FROM admin WHERE id = ? AND deletedAt IS NULL`;
        try {
            const adminId = req.params.id
            const fetchAdminResult: any = await execQuery(query, [adminId])
            if (fetchAdminResult.length !== 0) {
                return res.status(200).send(fetchAdminResult[0])
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async loginAdminByEmail(req: Request, res: Response) {
        const query = `SELECT * FROM admin WHERE emailId = ? AND deletedAt IS NULL`;
        try {
            const { emailId, password } = req.body
            const fetchAdminResult: any = await execQuery(query, [emailId])
            if (fetchAdminResult.length === 0) {
                return res.status(404).send(`Record not founded`)
            }
            const isPasswordMatch = hashService.comparePassword(password + fetchAdminResult[0].slatWord, fetchAdminResult[0].password)
            if (!isPasswordMatch) {
                return res.status(401).send('Invalid credentials')
            }
            const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now
            const payload = {
                adminId: fetchAdminResult[0].id,
                emailId: fetchAdminResult[0].emailId,
                role: 'admin',
                exp: expirationTime,
            };
            const privateKeyPem = process.env.JWE_PRIVATE_KEY || '';
            if (!privateKeyPem) {
                return res.status(500).send('Server configuration error: Private key not set.');
            }
            const privateKey = await crypto.webcrypto.subtle.importKey(
                'pkcs8',
                pemToArrayBuffer(privateKeyPem),
                { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
                false,
                ['sign']
            );
            const jwt = await new SignJWT(payload)
                .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime(expirationTime)
                .sign(privateKey);
            return res.status(200).json(    { token: jwt });
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }
}
export default AdminServices