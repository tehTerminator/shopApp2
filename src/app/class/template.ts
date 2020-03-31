import { Voucher } from '../interface/voucher';

export class Template {
    id: number;
    title: string;
    rate: number;
    products: Array<{product_id: number, quantity: number}>;
    creditorId: number;
    creditor: string;
    amount: number;
    categoryId: number;


    constructor(
        id: number,
        title: string,
        rate: number,
        creditorId?: number,
        creditor?: string,
        amount?: number,
        categoryId?: number
    ) {
        this.id = id;
        this.title = title;
        this.rate = rate;
        this.creditorId = creditorId === undefined ? 0 : creditorId;
        this.creditor = creditor === undefined ? '' : creditor;
        this.amount = amount === undefined ? 0 : amount;
        this.categoryId = categoryId === undefined ? 0 : categoryId;
    }

    addProduct(product: any) {
        this.products.push(product);
    }

    isProduct() {
        return this.categoryId === 0;
    }

    isTask() {
        return !this.isProduct();
    }

    isFixedRate(): boolean {
        return this.isTask() && this.rate >= 0;
    }

    /** *******************************
     * Getters and Setters
     * ********************************
     */
}
