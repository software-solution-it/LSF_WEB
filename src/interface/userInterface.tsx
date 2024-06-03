export interface User {
    createdAt: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    receiptConfirmed: any; // Ajuste o tipo conforme necessário
    userImage: any; // Ajuste o tipo conforme necessário
    userName: string;
}

export interface CurrentUser {
    geolocation: any; // Ajuste o tipo conforme necessário
    inauguration: any; // Ajuste o tipo conforme necessário
    point: any; // Ajuste o tipo conforme necessário
    supplier: any; // Ajuste o tipo conforme necessário
    technician: any; // Ajuste o tipo conforme necessário
    user: User;
}
