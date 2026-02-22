import { execQuery } from '../../config/database/db.connection'
import { IServiceResult, IAdmin } from '../../utils/utils';
import HashService from '../../utils/password.hash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { generateUniqueRandomString } from '../../utils/commonFunctions';
dotenv.config();

const hashService = new HashService()
const JWT_SECRET = process.env.JWT_SECRET || 'nkasbfiuwh92u93u023joiwnijdsbsfibufeyisasjwn938yy9fhnijsfbiw48rhbbjdb3274829IHjaieb8HJABHJIBJIqbdjiwbdia';

class AdminServices {
    async fetchAllAdminsByManagementId(managementId: string): Promise<IServiceResult<IAdmin[]>> {
        const query = `SELECT * FROM admin WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            const fetchAdminResult: any = await execQuery(query, [managementId])
            if (fetchAdminResult.length !== 0) {
                return { statusCode: 200, data: fetchAdminResult, message: '' };
            } else {
                return { statusCode: 404, data: [], message: 'Record not found' };
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: [],
            };
        }
    }

    async createAdmin(body: any, profileImage: string | null): Promise<IServiceResult<null>> {
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
            } = body

            const randomWord = crypto.randomBytes(15).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            const fullName = `${firstName} ${lastName}`
            const hashedPassword = hashService.hashPassword(password + randomWord)

            await execQuery(query, [
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
            return {
                statusCode: 201,
                message: 'Admin created.',
                data: null
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: error instanceof Error ? error.message : String(error),
                data: null,
            };
        }
    }

    async updateAdminById(adminId: string, reqUpdateValue: any, profileImage?: string | null) {
        try {
            if (profileImage) {
                reqUpdateValue.profileImage = profileImage;
            }

            if (Object.keys(reqUpdateValue).length === 0) {
                return { statusCode: 400, message: 'No fields provided for update.', data: null };
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(', ');
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE admin 
                SET ${updateValueObj},
                updatedAt = CURRENT_TIMESTAMP()
                WHERE id = ?`;

            const updateAdminResult: any = await execQuery(query, [
                ...updateValueData,
                adminId,
            ]);

            if (updateAdminResult.affectedRows !== 0) {
                return this.fetchAdminById(adminId);
            } else {
                return { statusCode: 404, message: 'Admin record not found.', data: null };
            }
        } catch (error) {
            console.error('Update error:', error);
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async deleteAdminById(adminId: string) {
        const query = `UPDATE admin SET deletedAt = NOW() WHERE id = ?`;
        try {
            const deleteAdminResult: any = await execQuery(query, [adminId])
            if (deleteAdminResult.affectedRows !== 0) {
                return { statusCode: 200, message: 'Admin deleted successfully.', data: null };
            } else {
                return { statusCode: 404, message: 'Record not found', data: null };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async fetchAdminById(adminId: string) {
        const query = `SELECT * FROM admin WHERE id = ? AND deletedAt IS NULL`;
        try {
            const fetchAdminResult: any = await execQuery(query, [adminId])
            if (fetchAdminResult.length !== 0) {
                return { statusCode: 200, data: fetchAdminResult[0], message: '' };
            } else {
                return { statusCode: 404, data: [], message: 'Record not found' };
            }
        } catch (error) {
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) };
        }
    }

    async loginAdminByEmail(emailId: string, password: string) {
        const query = `SELECT * FROM admin WHERE emailId = ? AND deletedAt IS NULL`;
        try {
            const fetchAdminResult: any = await execQuery(query, [emailId]);

            if (fetchAdminResult.length === 0) {
                return { statusCode: 404, message: 'Record not found', token: '', userData: {}, data: null };
            }

            const isPasswordMatch = hashService.comparePassword(
                password + fetchAdminResult[0].slatWord,
                fetchAdminResult[0].password
            );
            if (!isPasswordMatch) {
                return { statusCode: 401, message: 'Invalid credentials', token: '', userData: {}, data: null };
            }

            const payload = {
                adminId: fetchAdminResult[0].id,
                emailId: fetchAdminResult[0].emailId,
                role: 'admin',
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return {
                statusCode: 200,
                token,
                userData: {
                    id: fetchAdminResult[0].id,
                    firstName: fetchAdminResult[0].firstName,
                    fullName: fetchAdminResult[0].fullName,
                    emailId: fetchAdminResult[0].emailId,
                    profileImage: fetchAdminResult[0].profileImage,
                },
                message: ''
            };
        } catch (error: any) {
            console.error(error);
            return { statusCode: 500, message: error.message || error, token: '', userData: {}, data: null };
        }
    }

}
export default AdminServices