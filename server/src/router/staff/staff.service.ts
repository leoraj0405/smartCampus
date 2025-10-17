import { Request, Response } from 'express';
import { execQuery } from '../../config/database/db.connection'
import HashService from '../../utils/password.hash';
import crypto from 'crypto';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { generateUniqueRandomString } from '../../utils/commonFunctions';
dotenv.config();

const hashService = new HashService()
const JWT_SECRET = process.env.JWT_SECRET || 'nkasbfiuwh92u93u023joiwnijdsbsfibufeyisasjwn938yy9fhnijsfbiw48rhbbjdb3274829IHjaieb8HJABHJIBJIqbdjiwbdia';

class StaffServices {
    async fetchStaffByManagementId(req: Request, res: Response) {
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
        const query = `SELECT * FROM staff WHERE managementId = ? AND deletedAt IS NULL`;
        const countQuery = `SELECT COUNT(*) as total FROM staff WHERE managementId = ? AND deletedAt IS NULL`;
        try {
            const managementId = req.params.id
            const {
                limit = 10,
                page = 1,
                searchTerm = '',
                searchBy = 'fullName',
                searchType = 'contains' // 'startWith', 'endWith', 'exact', 'contains', 'not contains'
            } = req.body;
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
                    return res.status(400).send("Invalid pagination parameters.");
                }
                paginition = ` LIMIT ? OFFSET ?`;
            }
            const totalQuery: any = await execQuery(countQuery, [managementId])
            const totalRecords = totalQuery[0]?.total || 0;
            responseObj.pagination.totalRecords = totalRecords;
            if (totalQuery[0].total === 0) {
                return res.status(404).send(`Record not founded`)
            }
            const finalFetchQuery = `${query}${searchCondition} LIMIT ? OFFSET ?`;
            const response: any = await execQuery(finalFetchQuery, [managementId, ...searchValues, limitNumber, (pageNumber - 1) * limitNumber]);
            if (response.length === 0) {
                return res.status(404).send(responseObj)
            }
            responseObj.pagination.pageSize = limitNumber;
            responseObj.pagination.currentPage = pageNumber;
            responseObj.pagination.totalPages = totalRecords;
            responseObj.search = { searchTerm: searchTerm, searchBy: searchBy, searchType: searchType }
            responseObj.data = response;
            return res.status(200).send(responseObj)

        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async createStaff(req: Request, res: Response) {
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
            } = req.body;

            if (!req.file) {
                return res.status(400).send("No file uploaded.");
            }

            const randomWord = crypto.randomBytes(15).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            const fullName = `${firstName} ${lastName}`;
            const hashedPassword = hashService.hashPassword(password + randomWord);
            const profileImage = req.file.filename;
            const joiningDate = req.body.joiningDate ? new Date(req.body.joiningDate) : null;

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
                joiningDate,
                position,
                exprience,
                staffType,
                teaching,
                department,
                randomWord
            ]);

            return res.status(201).send("Staff created successfully.");
        } catch (error) {
            return res.status(500).send(`Server Error: ${error}`);
        }
    }


    async updateStaffById(req: Request, res: Response) {
        try {
            const staffId = req.params.id;
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

            const query = `UPDATE staff 
                SET ${updateValueObj},
                updatedAt = CURRENT_TIMESTAMP()
                WHERE id = ?`;

            const response: any = await execQuery(query, [
                ...updateValueData,
                staffId,
            ]);

            if (response.affectedRows !== 0) {
                this.fetchStaffbyId(req, res)
            } else {
                return res.status(404).send("staff record not found.");
            }
        } catch (error) {
            console.error("Update error:", error);
            return res.status(500).send(`Server Error: ${error}`);
        }
    }

    async deleteStaffById(req: Request, res: Response) {
        const query = `UPDATE staff SET deletedAt = NOW() WHERE id = ?`;
        try {
            const staffId = req.params.id
            const deleteResponse: any = await execQuery(query, [staffId])
            if (deleteResponse.affectedRows !== 0) {
                return res.status(200).send('staff deleted successfully.')
            } else {
                return res.status(404).send('Record not founded')
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async fetchStaffbyId(req: Request, res: Response) {
        const query = `SELECT * FROM staff WHERE id = ? AND deletedAt IS NULL`;
        try {
            const staffId = req.params.id
            const staffResponse: any = await execQuery(query, [staffId])
            if (staffResponse.length !== 0) {
                return res.status(200).send(staffResponse[0])
            } else {
                return res.status(404).send(`Record not founded`)
            }
        } catch (error) {
            return res.status(500).send(`Server Error : ${error}`)
        }
    }

    async loginStaffByEmail(req: Request, res: Response) {
        const query = `SELECT * FROM staff WHERE emailId = ? AND deletedAt IS NULL`;
        try {
            const { emailId, password } = req.body;
            const staffResponse: any = await execQuery(query, [emailId]);
            if (staffResponse.length === 0) {
                return res.status(404).send('Record not found');
            }

            const isPasswordMatch = hashService.comparePassword(
                password + staffResponse[0].slatWord,
                staffResponse[0].password
            );
            if (!isPasswordMatch) {
                return res.status(401).send('Invalid credentials');
            }

            const payload = {
                staffId: staffResponse[0].id,
                emailId: staffResponse[0].emailId,
                role: 'staff',
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                token: token, userData: {
                    id: staffResponse[0].id,
                    firstName: staffResponse[0].firstName,
                    fullName: staffResponse[0].fullName,
                    emailId: staffResponse[0].emailId,
                    profileImage: staffResponse[0].profileImage,
                }
            });
        } catch (error: any) {
            return res.status(500).send(`Server Error: ${error.message}`);
        }
    }

}
export default StaffServices