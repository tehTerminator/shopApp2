export interface SqlResponse {
    rows: Array<any>;
    query: string;
    rowCount: number;
    lastInsertId: number;
}
