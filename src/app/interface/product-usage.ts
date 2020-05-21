export interface ProductUsage {
    id?: number;
    template_id: number;
    raw_material_id: number;
    quantity: number;
    amount: number;
    posted_on?: string;
    user_id?: number;
}
