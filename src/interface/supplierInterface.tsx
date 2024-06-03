interface SupplierData {
    id: number;
    city: string;
    supplierName: string;
    phone: string;
    supplierType: number;
    supplierDomain: {
        id: number;
        supplierTypeName: string;
    };
}