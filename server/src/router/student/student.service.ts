import { execQuery } from '../../config/database/db.connection'
import HashService from '../../utils/password.hash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { generateUniqueRandomString } from '../../utils/commonFunctions';
import { IFetchStudents, IInsertStudent, IServiceResult, IResObj } from '../../utils/utils';
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
    ): Promise<IServiceResult<object>> {
        const responseObj: IResObj = {
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
            totalRecords: 0
        }
        const query = `SELECT * FROM students WHERE managementId = ? AND deletedAt IS NULL`;
        const countQuery = `SELECT COUNT(*) as total FROM students WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            let paginition = '';
            let pattern: string;
            let searchCondition = '';
            const searchValues: Array<string | number | boolean | null> = [];

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
            const totalQuery = await execQuery(countQuery, [managementId]) as { total: number }[]
            const totalRecords = totalQuery[0]?.total || 0;
            responseObj.totalRecords = totalRecords;
            if (totalQuery[0].total === 0) {
                return { statusCode: 404, data: responseObj, message: 'No records.' };
            }
            const finalFetchQuery = `${query}${searchCondition} LIMIT ? OFFSET ?`;
            type DBStudent = IInsertStudent & { id: string; password?: string; slatWord?: string; fullName?: string; emailId?: string; profileImage?: string };
            const response = await execQuery(finalFetchQuery, [managementId, ...searchValues, limitNumber, (pageNumber - 1) * limitNumber]) as DBStudent[];
            if (!response || response.length === 0) {
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


    async updateStudentById(studentId: string, reqUpdateValue: Record<string, string | number | boolean | null>, profileImage?: string | null) {
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
            const resp = await execQuery(query, [
                ...updateValueData,
                studentId,
            ]);

            const ura = resp as { affectedRows?: number };
            if (ura.affectedRows && ura.affectedRows !== 0) {
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
            const deleteResponse = await execQuery(query, [studentId])
            const dr = deleteResponse as { affectedRows?: number };
            if (dr.affectedRows && dr.affectedRows !== 0) {
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
            type DBStudent = IInsertStudent & { id: string; password?: string; slatWord?: string; fullName?: string; emailId?: string; profileImage?: string };
            const response = await execQuery(query, [studentId]) as DBStudent[]
            if (response && response.length !== 0) {
                const r = response[0];
                const record: IInsertStudent = {
                    firstName: r.firstName,
                    lastName: r.lastName,
                    gender: r.gender,
                    dob: r.dob,
                    classId: r.classId,
                    sectionId: r.sectionId,
                    departmentId: r.departmentId,
                    courseId: r.courseId,
                    academicYear: r.academicYear,
                    email: r.email || r.emailId || '',
                    phoneNumber: r.phoneNumber,
                    guardianName: r.guardianName,
                    guardianPhone: r.guardianPhone,
                    guardianEmail: r.guardianEmail,
                    address: r.address,
                    password: '',
                    status: r.status,
                    profileImage: r.profileImage,
                    managementId: r.managementId
                }
                return { statusCode: 200, data: record, message: '' };
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
            type DBStudent = IInsertStudent & { id: string; password?: string; slatWord?: string; fullName?: string; emailId?: string; profileImage?: string };
            const response = await execQuery(query, [email]) as DBStudent[];
            if (!response || response.length === 0) {
                return { statusCode: 401, message: 'Invalid Email.', token: '', userData: {}, data: null };
            }
            const isPasswordMatch = hashService.comparePassword(
                password + (response[0].slatWord || ''),
                response[0].password || ''
            );
            if (!isPasswordMatch) {
                return { statusCode: 401, message: 'Invalid credentials.', token: '', userData: {}, data: null };
            }

            const payload = {
                studentId: response[0].id,
                emailId: response[0].email || response[0].emailId,
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
                    emailId: response[0].email || response[0].emailId,
                    profileImage: response[0].profileImage,
                },
                message: ''
            };
        } catch (error) {
            return { statusCode: 500, message: error instanceof Error ? error.message : String(error), token: '', userData: {}, data: null };
        }
    }

}
export default Studentservices