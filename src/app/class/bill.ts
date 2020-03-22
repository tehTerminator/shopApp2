import { Voucher } from '../interface/voucher';
import { ProductUsage } from '../interface/product-usage';
import { Transaction } from '../interface/transaction';
import { Template } from './template';
import { LedgerService } from '../services/ledger.service';
import { AuthService } from '../services/auth.service';

export class Bill {
    private vouchers: Array<Voucher>;
    private productUsage: Array<ProductUsage>;
    private transactions: Array<Transaction>;
    private ledgerService: LedgerService;
    private authService: AuthService;

    constructor() {
        this.vouchers = [];
        this.productUsage = [];
        this.transactions = [];
    }

    addTemplate(aTemplate: Template) {
        // Add Products to Products Usage
        // Add Sales Voucher
        if (aTemplate.products !== undefined ) {
            aTemplate.products.forEach( (product: any) => {
                const item: ProductUsage = {
                    template_id: aTemplate.id,
                    
                    raw_material_id: product.raw_material_id,
                    quantity: product.quantity,
                    amount: product.amount,
                    user_id: this.authService.activeUser.id
                };
                this.productUsage.push(item);
            });
            this.vouchers = aTemplate.vouchers;
        }

    }

    
}
