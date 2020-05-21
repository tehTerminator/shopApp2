export interface SqlRequest {
    columns?: Array<string>;
    andWhere?: any;
    orWhere?: any;
    orderBy?: string;
    limit?: string;
    join?: string;
    userData?: any;
}
