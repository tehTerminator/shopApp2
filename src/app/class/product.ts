import { RawMaterial } from '../interface/raw-material';
import { SqlService } from './../services/sql.service';
import { SqlRequest } from '../interface/sql-request';
import { SqlResponse } from '../interface/sql-response';

export interface ConsumptionTemplate {
    material_id: number;
    quantity: number;
}

export class Product {
    private id: number;
    private title: string;
    private rate: number;
    private template: Array<ConsumptionTemplate>;
    private sql: SqlService;

    constructor(id: number, title: string, rate: number) {
        this.id = id;
        this.title = title;
        this.rate = rate;
        this.template = [];
    }

    fetchTemplate() {
        this.sql.select('consumption_template', {
            columns: ['material_id', 'quantity'],
            andWhere: {product_id: this.id}
        }).subscribe((res: Array<ConsumptionTemplate>) => {
            this.template = res;
        });
    }
}
