export class InvoiceData {
    id: number;
    description: string;
    rate: number;
    quantity: number;
    discount: number;

    constructor(desc: string, rate: number, quantity?: number, discount?: number) {
        this.description = desc;
        this.rate = rate;
        this.quantity = ( quantity === undefined ) ? 1.00 : quantity;
        this.discount = (discount === undefined ) ? 0.00 : discount;
    }

    get amount(): number {
        return (this.quantity * this.rate) * (1 - this.discount / 100 );
    }
}
