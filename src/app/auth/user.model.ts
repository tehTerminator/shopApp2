export class User{
    constructor(
        public email: string,
        public userId: string,
        private theToken: string,
        private expiresIn: Date
    ) {}

    get token(): string {
        const currentTime = (new Date()).getTime();
        if(this.expiresIn.getTime() < currentTime) {
            return this.theToken;
        }
        return null;
    }
}

