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