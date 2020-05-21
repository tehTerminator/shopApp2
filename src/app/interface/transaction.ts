export interface Transaction {
    id: number;
    bill_id?: number;
    description: string;
    quantity: number;
    rate: number;
    discount: number;
    amount: number;
}
