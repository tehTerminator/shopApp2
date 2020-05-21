export class Element {
    id: number;
    title: string;
    kind: string;
    additionalData: any;

    /**
     *
     * @param obj Must Contain id, title, kind, and additional_data
     */
    constructor(obj: {id: number, title: string, kind: string, additional_data: string}) {
        this.id = obj.id;
        this.title = obj.title;
        this.kind = obj.kind;
        this.additionalData = JSON.parse(obj.additional_data);
    }

    /**
     * Return Value from Additional Data
     * Returns null if key is not found;
     * @param theKey From Additional Data
     */
    get(theKey: string): any {
        if ( theKey in this.additionalData ) {
            return this.additionalData.theKey;
        } else {
            return null;
        }
    }
}
