export class Producer{
    constructor(
        public id : number,
        public owner_firstname: string,
        public owner_lastname: string,
        public name:string,
        public email: string,
        public address: string,
        public additional_address: string,
        public city: string,
        public zip: number,
        public phone: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ){}
}

// "id": 1,
// "name": "La ferme du Nord",
// "owner_firstname": "Jean",
// "owner_lastname": "Ferme",
// "city": "Lomme",
// "zip": "59160",
// "address": "Rue de la pature",
// "additional_address": null,
// "phone": "+33658624512",
// "email": "lafermedunord@gmail.com",
// "createdAt": "2020-08-23T13:48:24.576Z",
// "updatedAt": "2020-08-23T13:48:24.576Z"