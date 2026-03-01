export type IFetchStudents = {
    limit: number;
    page: number;
    searchTerm: string;
    searchBy: string;
    searchType: string;
    managementId: string;
}

export type IInsertStudent = {
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

export type IAdminResponse = {
    data?: object | null;
    statusCode: number;
    message?: string;
}

// Generic service response
export type IServiceResult<T> = {
    statusCode: number;
    data?: T | null;
    message?: string;
    error?: string | null;
    token?: string | null;
    userData?: object | null;
}

// Admin types
export type IAdminCreate = {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    status?: string;
    phoneNumber?: string;
    managementId: string;
    profileImage?: string | null;
}

export type IAdmin = {
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
export type IFetchStaff = IFetchStudents

export type IStaffCreate = {
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

export type IStaff = {
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
export type IDepartmentCreate = {
    name: string;
    managementId: string;
}

export type IDepartment = {
    id: string;
    name: string;
    managementId: string;
}

// Management types
export type IManagementCreate = {
    name: string;
    managementType?: string;
}

export type IManagement = {
    id: string;
    name: string;
    managementType?: string;
    images?: string[],
    about?: string;
}

// Student helper types kept above (no duplicates)

export type IEvents = {
    id: string;
    eventTitle: string;
    eventDescription: string;
    eventType: "1" | "2" | "3" | "4" | "5" | "6" | "7";
    targetAudience: "0" | "1" | "2";
    eventStartDate: string;          // ISO date string
    eventEndDate: string;            // ISO date string
    registrationDeadline: string;    // ISO date string
    venue: string;
    maxParticipants: number;
    registrationRequired: boolean | number;
    managementId: string;
    eventBanner: string;
    status: "1" | "2" | "3" | "4";
    createdBy: string;
    createdAt: string;               // ISO date string
    updatedAt: string;               // ISO date string
    deletedAt: string | null;
}

export type IResObj = {
    data: any[],
    pagination: {
        totalPages: number,
        currentPage: number,
        pageSize: number
    },
    search: {
        searchTerm: string,
        searchBy: string,
        searchType: string
    },
    totalRecords: number
}