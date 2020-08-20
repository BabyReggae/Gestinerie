export class Producers{
    constructor(
        public id : number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public address: string,
        public additional_address: string,
        public city: string,
        public zip: number,
        public password: string,
        public is_premium: boolean,
        public role: string,
        public createdAt: Date,
        public updatedAt: Date,
        public creditCards: string[],
        public commands: string[]
    ){}
}