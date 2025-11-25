export interface IFetchStudents {
    limit: number;
    page: number;
    searchTerm: string;
    searchBy: string;
    searchType: string;
    managementId: string;
}

export interface IInsertStudent {
    firstName: string;
    lastName: string;
    gender: string; 
    dob: string;
    classId: string;
    sectionId: string;
    departmentId: string;
    courseId: string;
    academicYear: string;
    email: string;
    phoneNumber: string;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
    address: string;
    password: string;
    status: string;
    profileImage: string;
    managementId: string;
}

export interface IAdminResponse {
    data?: any;
    statusCode: number;
    message?: string;
}

// Generic service response
export interface IServiceResult<T = any> {
    statusCode: number;
    data?: T | null;
    message?: string;
    error?: any;
    token?: string;
    userData?: any;
}

// Admin types
export interface IAdminCreate {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    status?: string;
    phoneNumber?: string;
    managementId: string;
    profileImage?: string | null;
}

export interface IAdmin {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    emailId: string;
    status?: string;
    profileImage?: string;
    phoneNumber?: string;
    managementId: string;
    slatWord?: string;
}

// Staff types
export interface IFetchStaff extends IFetchStudents {}

export interface IStaffCreate {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    status?: string;
    managementId: string;
    phoneNumber?: string;
    qulification?: string;
    about?: string;
    gender?: string;
    dob?: string;
    joiningDate?: string | null;
    position?: string;
    exprience?: string;
    staffType?: string;
    teaching?: string;
    department?: string;
    profileImage?: string | null;
}

export interface IStaff {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    emailId: string;
    status?: string;
    profileImage?: string;
    managementId: string;
    phoneNumber?: string;
}

// Department types
export interface IDepartmentCreate {
    name: string;
    managementId: string;
}

export interface IDepartment {
    id: string;
    name: string;
    managementId: string;
}

// Management types
export interface IManagementCreate {
    name: string;
    managementType?: string;
}

export interface IManagement {
    id: string;
    name: string;
    managementType?: string;
}

// Student helper types (keep original names for compatibility)
export interface IFetchStudents {
    limit: number;
    page: number;
    searchTerm: string;
    searchBy: string;
    searchType: string;
    managementId: string;
}

export interface IInsertStudent {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    classId: string;
    sectionId: string;
    departmentId: string;
    courseId: string;
    academicYear: string;
    email: string;
    phoneNumber: string;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
    address: string;
    password: string;
    status: string;
    profileImage: string;
    managementId: string;
}
