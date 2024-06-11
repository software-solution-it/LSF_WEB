export interface Point {
    id: number;
    width: string;
    length: string;
    active: boolean;
    createdAt:any
}

export interface Technician {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    active: boolean;
    createdAt:any
}

export interface Electric {
    id: number;
    projectId: number;
    voltage: string;
    network: string;
}

export interface ProjectFile {
    id: number;
    fileName: string;
    folder: string;
    fileType: string;
}

export interface ProjectFiles {
    confirmedReceipt: any; // Ajuste o tipo conforme necessário
    receiptDeclinedReason: any; // Ajuste o tipo conforme necessário
    recipe: ProjectFile | null;
    hydraulicModel: ProjectFile | null;
    electricModel: ProjectFile | null;
    sketchModel: ProjectFile | null;
}

export interface Project {
    id: number;
    name: string;
    geolocation: any; // Ajuste o tipo conforme necessário
    point: Point | null;
    suppliers: any[]; // Ajuste o tipo conforme necessário
    technician: Technician | null;
    electric: Electric | null;
    projectFiles: ProjectFiles;
}

export interface User {
    id: number;
    name: string;
    email: string;
    projects: Project[];
}
