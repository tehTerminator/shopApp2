export interface Message {
    id?: number;
    title: string;
    content: string;
    additionalInfo?: Array<string>;
    timestamp?: Date;
}
