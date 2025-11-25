import { execQuery } from '../../config/database/db.connection'
import HashService from '../../utils/password.hash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { generateUniqueRandomString } from '../../utils/commonFunctions';
import { IFetchStudents, IInsertStudent, IServiceResult } from '../../utils/utils';
dotenv.config();

const hashService = new HashService()
const JWT_SECRET = process.env.JWT_SECRET || 'nkasbfiuwh92u93u023joiwnijdsbsfibufeyisasjwn938yy9fhnijsfbiw48rhbbjdb3274829IHjaieb8HJABHJIBJIqbdjiwbdia';

class Studentservices {
    async fetchStudentsByManagementId({
        managementId,
        limit = 10,
        page = 1,
        searchTerm = '',
        searchBy = 'fullName',
        searchType = 'contains',
    }: IFetchStudents
    ): Promise<IServiceResult<any>> {
        const responseObj = {
            data: [],
            pagination: {
                totalRecords: 0,
                totalPages: 0,
                currentPage: 0,
                pageSize: 0
            },
            search: {
                searchTerm: '',
                searchBy: '',
                searchType: ''
            }
        }
        const query = `SELECT * FROM students WHERE managementId = ? AND deletedAt IS NULL`;
        const countQuery = `SELECT COUNT(*) as total FROM students WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            let paginition = '';
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
                    return { statusCode: 400, data: responseObj, message: 'Bad Input request.' };
                }
                paginition = ` LIMIT ? OFFSET ?`;
            }
            const totalQuery: any = await execQuery(countQuery, [managementId])
            const totalRecords = totalQuery[0]?.total || 0;
            responseObj.pagination.totalRecords = totalRecords;
            if (totalQuery[0].total === 0) {
                return { statusCode: 404, data: responseObj, message: 'No records.' };
            }
            const finalFetchQuery = `${query}${searchCondition} LIMIT ? OFFSET ?`;
            const response: any = await execQuery(finalFetchQuery, [managementId, ...searchValues, limitNumber, (pageNumber - 1) * limitNumber]);
            if (response.length === 0) {
                return { statusCode: 404, data: responseObj, message: 'No records.' };
            }
            responseObj.pagination.pageSize = limitNumber;
            responseObj.pagination.currentPage = pageNumber;
            responseObj.pagination.totalPages = totalRecords;
            responseObj.search = { searchTerm: searchTerm, searchBy: searchBy, searchType: searchType }
            responseObj.data = response;
            return { statusCode: 200, data: responseObj, message: '' };

        } catch (error) {
            return { statusCode: 500, data: responseObj, message: error instanceof Error ? error.message : String(error) };
        }
    }

    async createStudent(studentData: IInsertStudent, profileImage: string | null): Promise<IServiceResult<null>> {
        const query = `
            INSERT INTO students (
                id, 
                admissionNo, 
                rollNo, 
                firstName, 
                lastName,
                fullName, 
                gender, 
                dob,
                classId, 
                sectionId, 
                departmentId, 
                courseId, 
                academicYear,
                email, 
                phoneNumber, 
                guardianName, 
                guardianPhone, 
                guardianEmail,
                address, 
                password, 
                status, 
                profileImage, 
                managementId,
                slatWord
            )
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;

        try {
            const {
                firstName,
                lastName,
                gender,
                dob,
                classId,
                sectionId,
                departmentId,
                courseId,
                academicYear,
                email,
                phoneNumber,
                guardianName,
                guardianPhone,
                guardianEmail,
                address,
                password,
                status,
                managementId,
            } = studentData;

            const randomWord = crypto.randomBytes(15).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            const fullName = `${firstName} ${lastName}`;
            const hashedPassword = hashService.hashPassword(password + randomWord);

            await execQuery(query, [
                generateUniqueRandomString(),
                generateUniqueRandomString(),
                generateUniqueRandomString(),
                firstName,
                lastName,
                fullName,
                gender,
                dob,
                classId,
                sectionId,
                departmentId,
                courseId,
                academicYear,
                email,
                phoneNumber,
                guardianName,
                guardianPhone,
                guardianEmail,
                address,
                hashedPassword,
                status,
                profileImage,
                managementId,
                randomWord
            ]
            );
            return { statusCode: 201, message: 'Student created successfully.', data: null };
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), data: null };
        }
    }


    async updateStudentById(studentId: string, reqUpdateValue: any, profileImage?: string | null) {
        try {
            if (profileImage) {
                reqUpdateValue.profileImage = profileImage;
            }

            if (Object.keys(reqUpdateValue).length === 0) {
                return { statusCode: 400, data: [], message: 'No fields provided for update.' };
            }

            const updateValueObj = Object.keys(reqUpdateValue)
                .map((key: string) => `${key} = ?`)
                .join(", ");
            const updateValueData = Object.values(reqUpdateValue);

            const query = `UPDATE students 
                SET ${updateValueObj},
                updatedAt = CURRENT_TIMESTAMP()
                WHERE id = ?`;
            const response: any = await execQuery(query, [
                ...updateValueData,
                studentId,
            ]);

            if (response.affectedRows !== 0) {
                return this.fetchStudentbyId(studentId)
            } else {
                return { statusCode: 404, data: [], message: 'record not found' };
            }
        } catch (error) {
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) };
        }
    }

    async deleteStudentById(studentId: string) {
        const query = `UPDATE students SET deletedAt = NOW() WHERE id = ?`;
        try {
            const deleteResponse: any = await execQuery(query, [studentId])
            if (deleteResponse.affectedRows !== 0) {
                return this.fetchStudentbyId(studentId)
            } else {
                return { statusCode: 404, data: [], message: 'record not found' };
            }
        } catch (error) {
            console.log(error)
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) };
        }
    }

    async fetchStudentbyId(studentId: string) {
        const query = `SELECT * FROM students WHERE id = ?`;
        try {
            const response: any = await execQuery(query, [studentId])
            if (response.length !== 0) {
                return { statusCode: 200, data: response[0], message: '' };
            } else {
                return { statusCode: 404, data: [], message: 'Record not found' };
            }
        } catch (error) {
            return { statusCode: 500, data: [], message: error instanceof Error ? error.message : String(error) };
        }
    }

    async loginStudentByEmail(email: string, password: string) {
        const query = `SELECT * FROM students WHERE email = ? AND deletedAt IS NULL`;
        try {
            const response: any = await execQuery(query, [email]);
            if (response.length === 0) {
                return { statusCode: 401, message: 'Invalid Email.', token: '', userData: {}, data: null };
            }

            const isPasswordMatch = hashService.comparePassword(
                password + response[0].slatWord,
                response[0].password
            );
            if (!isPasswordMatch) {
                return { statusCode: 401, message: 'Invalid credentials.', token: '', userData: {}, data: null };
            }

            const payload = {
                studentId: response[0].id,
                emailId: response[0].email,
                role: 'student',
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return {
                statusCode: 200,
                token: token,
                userData: {
                    id: response[0].id,
                    firstName: response[0].firstName,
                    fullName: response[0].fullName,
                    emailId: response[0].emailId,
                    profileImage: response[0].profileImage,
                },
                message: ''
            };
        } catch (error: any) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), token: '', userData: {}, data: null };
        }
    }

}
export default Studentservices