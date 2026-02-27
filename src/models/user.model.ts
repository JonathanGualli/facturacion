export interface User{
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
    companyId: number;
    companyName: string;
    status: boolean;    
}