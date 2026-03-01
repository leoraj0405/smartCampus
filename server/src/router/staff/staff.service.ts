import { execQuery } from '../../config/database/db.connection'
import { IServiceResult, IStaff } from '../../utils/utils';
import HashService from '../../utils/password.hash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { generateUniqueRandomString } from '../../utils/commonFunctions';
dotenv.config();

const hashService = new HashService()
const JWT_SECRET = process.env.JWT_SECRET || 'nkasbfiuwh92u93u023joiwnijdsbsfibufeyisasjwn938yy9fhnijsfbiw48rhbbjdb3274829IHjaieb8HJABHJIBJIqbdjiwbdia';

class StaffServices {
    async fetchStaffByManagementId(managementId: string, options?: any): Promise<IServiceResult<any>> {
        const responseObj = {
            data: [],
            pagination: {
                totalPages: 0,
                currentPage: 0,
                pageSize: 0
            },
            search: {
                searchTerm: '',
                searchBy: '',
                searchType: ''
            },
            totalRecords: 0,
        }
        const query = `SELECT * FROM staff WHERE managementId = ? AND deletedAt IS NULL`;
        const countQuery = `SELECT COUNT(*) as total FROM staff WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            const {
                limit = 10,
                page = 1,
                searchTerm = '',
                searchBy = 'fullName',
                searchType = 'contains'
            } = options || {};
            let pattern;
            let searchCondition = '';
            const searchValues: any[] = [];

            if (searchType === 'startWith') pattern = `${searchTerm}%`;
            else if (searchType === 'endWith') pattern = `%${searchTerm}`;
            else if (searchType === 'exact') pattern = `${searchTerm}`;
            else pattern = `%${searchTerm}%`;

            searchCondition = ` AND ${searchBy} LIKE ?`;
            searchValues.push(pattern);
            const limitNumber = Number(limit);
            const pageNumber = Number(page);
            if (limitNumber && pageNumber) {
                if (isNaN(limitNumber) || isNaN(pageNumber) || limitNumber <= 0 || pageNumber <= 0) {
                    return { statusCode: 400, data: responseObj, message: 'Invalid pagination parameters.' };
                }
            }
            const totalQuery: any = await execQuery(countQuery, [managementId])
            const totalRecords = totalQuery[0]?.total || 0;
            responseObj.totalRecords = totalRecords;
            if (totalQuery[0].total === 0) {
                return { statusCode: 404, data: responseObj, message: 'Record not found' };
            }
            const finalFetchQuery = `${query}${searchCondition} LIMIT ? OFFSET ?`;
            const response: any = await execQuery(finalFetchQuery, [managementId, ...searchValues, limitNumber, (pageNumber - 1) * limitNumber]);
            if (response.length === 0) {
                return { statusCode: 404, data: responseObj, message: 'No records' };
            }
            responseObj.pagination.pageSize = limitNumber;
            responseObj.pagination.currentPage = pageNumber;
            responseObj.pagination.totalPages = totalRecords;
            responseObj.search = { searchTerm: searchTerm, searchBy: searchBy, searchType: searchType }
            responseObj.data = response;
            return { statusCode: 200, data: responseObj, message: '' }

        } catch (error) {
            return { statusCode: 500, data: responseObj, message: error instanceof Error ? error.message : String(error) }
        }
    }

    async createStaff(body: any, profileImage: string | null): Promise<IServiceResult<null>> {
        const query = `
        INSERT INTO staff (
            id,
            firstName,
            lastName,
            fulName,
            emailId,
            password,
            status,
            profileImage,
            managementId,
            phoneNumber,
            qulification,
            about,
            gender,
            dob,
            joiningDate,
            position,
            exprience,
            staffType,
            teaching,
            department,
            slatWord
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        try {
            const {
                firstName,
                lastName,
                emailId,
                password,
                status,
                managementId,
                phoneNumber,
                qulification,
                about,
                gender,
                dob,
                position,
                exprience,
                staffType,
                teaching,
                department,
                joiningDate
            } = body;

            if (!profileImage) {
                return { statusCode: 400, message: 'No file uploaded.', data: null };
            }

            const randomWord = crypto.randomBytes(15).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            const fullName = `${firstName} ${lastName}`;
            const hashedPassword = hashService.hashPassword(password + randomWord);
            const jd = joiningDate ? new Date(joiningDate) : null;

            await execQuery(query, [
                generateUniqueRandomString(), // id
                firstName,
                lastName,
                fullName,
                emailId,
                hashedPassword,
                status,
                profileImage,
                managementId,
                phoneNumber,
                qulification,
                about,
                gender,
                dob,
                jd,
                position,
                exprience,
                staffType,
                teaching,
                department,
                randomWord
            ]);

            return { statusCode: 201, message: 'Staff created successfully.', data: null };
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }


    async updateStaffById(staffId: string, reqUpdateValue: any, profileImage?: string | null) {
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
            const updateValueData: any = Object.values(reqUpdateValue);

            const query = `UPDATE staff 
                SET ${updateValueObj},
                updatedAt = CURRENT_TIMESTAMP()
                WHERE id = ?`;

            const response: any = await execQuery(query, [
                ...updateValueData,
                staffId,
            ]);

            if (response.affectedRows !== 0) {
                return this.fetchStaffbyId(staffId)
            } else {
                return { statusCode: 404, message: 'staff record not found.', data: null };
            }
        } catch (error) {
            console.error('Update error:', error);
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async deleteStaffById(staffId: string) {
        const query = `UPDATE staff SET deletedAt = NOW() WHERE id = ?`;
        try {
            const deleteResponse: any = await execQuery(query, [staffId])
            if (deleteResponse.affectedRows !== 0) {
                return { statusCode: 200, message: 'staff deleted successfully.', data: null };
            } else {
                return { statusCode: 404, message: 'Record not found', data: null };
            }
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }

    async fetchStaffbyId(staffId: string) {
        const query = `SELECT * FROM staff WHERE id = ? AND deletedAt IS NULL`;
        try {
            const staffResponse: any = await execQuery(query, [staffId])
            if (staffResponse.length !== 0) {
                return { statusCode: 200, data: staffResponse[0], message: '' };
            } else {
                return { statusCode: 404, data: [], message: 'Record not found' };
            }
        } catch (error) {
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) };
        }
    }

    async loginStaffByEmail(emailId: string, password: string) {
        const query = `SELECT * FROM staff WHERE emailId = ? AND deletedAt IS NULL`;
        try {
            const staffResponse: any = await execQuery(query, [emailId]);
            if (staffResponse.length === 0) {
                return { statusCode: 404, message: 'Record not found', token: '', userData: {}, data: null };
            }

            const isPasswordMatch = hashService.comparePassword(
                password + staffResponse[0].slatWord,
                staffResponse[0].password
            );
            if (!isPasswordMatch) {
                return { statusCode: 401, message: 'Invalid credentials', token: '', userData: {}, data: null };
            }

            const payload = {
                staffId: staffResponse[0].id,
                emailId: staffResponse[0].emailId,
                role: 'staff',
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return {
                statusCode: 200,
                token,
                userData: {
                    id: staffResponse[0].id,
                    firstName: staffResponse[0].firstName,
                    fullName: staffResponse[0].fullName,
                    emailId: staffResponse[0].emailId,
                    profileImage: staffResponse[0].profileImage,
                },
                message: ''
            };
        } catch (error: any) {
            return { statusCode: 500, message: error.message || error, token: '', userData: {}, data: null };
        }
    }

}
export default StaffServices