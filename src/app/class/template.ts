import { Voucher } from '../interface/voucher';

export class Template {
    private myId: number;
    private myTitle: string;
    private myRate: number;
    private mySettings: {
        products: Array<{product_id: number, quantity: number}>,
        vouchers: Array<Voucher>,
        category_id: number
    };

    constructor(id: number, title: string, rate: number, settings: any) {
        this.id = id;
        this.title = title;
        this.rate = rate;
        this.settings = settings;
    }

    /** *******************************
     * Getters and Setters
     * ********************************
     */

    get id(): number {
        return this.myId;
    }

    set id(id: number) {
        id > 0 ? this.myId = id : this.myId = 0;
    }

    get title(): string {
        return this.myTitle;
    }

    set title(theTitle: string) {
        this.title = theTitle;
    }

    set settings(data: any) {
        this.mySettings = JSON.parse(data);
    }

    get rate(): number {
        return this.myRate;
    }

    set rate(theRate: number) {
        this.myRate = theRate;
    }

    get categoryId(): number {
        return this.mySettings.category_id;
    }

    get vouchers(): Array<any> {
        return this.mySettings.vouchers;
    }

    get products(): Array<any> {
        return this.mySettings.products;
    }
}
