import { RawMaterial } from '../interface/raw-material';

export interface ConsumptionTemplate {
    material: RawMaterial;
    quantity: number;
}

export class Product {
    private id: number;
    private title: string;
    private rate: number;
    private template: Array<ConsumptionTemplate>;

    constructor(id: number, title: string, rate: number) {
        this.id = id;
        this.title = title;
        this.rate = rate;
        this.template = [];
    }

}
