export class User{
    constructor(
        public uid: string,
        public username: string,
        public displayName: string,
        private _token: string,
        private expirationTime: number
    ) {}

    get token(): string {
        const currentTime = (new Date()).getTime();
        if(this.expirationTime > currentTime) {
            return this._token;
        }
        return null;
    }


}

