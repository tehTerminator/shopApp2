export interface Voucher {
    id?: number;
    against_id?: number;
    creditor_id: number;
    creditor?: string;
    debtor_id?: number;
    debtor?: string;
    posted_on?: string;
    amount: number;
    narration: string;
    user_id?: number;
    user?: string;
}
