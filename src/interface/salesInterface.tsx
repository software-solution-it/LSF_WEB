export interface SalesReport {
    userId: number;
    laundry: string;
    sellDate: Date;
    interprise: string;
    interpriseDocument: string;
    equipment: string;
    situation: boolean;
    paymentType: string;
    value: number;
    valueWithNoDiscount: number;
    provider: string;
    acquirer: string;
    cardFlag: string;
    cardType: string;
    cardNumber: string;
    authorizer: string;
    voucher: string;
    voucherCategory: string;
    cupom: string;
    cPFClient: string;
    nameClient: string;
    requisition: string;
    cupomRequisition: string;
    codeAuthSender: string;
    error: string;
    errorDetail: string;
}
