export class Order{
    constructor(
        public id: any,
        public price: any,
        public address: any,
        public additional_address: any,
        public city: any,
        public zip: any,
        public deliveryDate: any,
        public deliveryStatus: any,
        public date: any,
        public baskets: any[],
        public client: any[],
    ){}
}


// {
//     "id": 1,
//     "price": 20,
//     "address": "82 Rue du poisson rouge",
//     "additional_address": "Appartement d05",
//     "city": "Lomme",
//     "zip": "59160",
//     "deliveryDate": "2020-08-20T22:34:53.387Z",
//     "deliveryStatus": "preparing",
//     "date": "2020-08-20T22:34:53.387Z",
//     "baskets": [
//         {
//             "id": 1,
//             "name": "Le Nord provencal",
//             "price": 20,
//             "description": "Découvrez le panier qui réchauffe vos papilles !",
//             "image": "http://www.lahalledantan.com/57-large_default/le-panier-d-hiver.jpg"
//         }
//     ],
//     "client": [
//         {
//             "id": 2,
//             "firstname": "Jean",
//             "lastname": "Louche",
//             "email": "jlouche@gmail.com",
//             "address": "1 rue de la victoire",
//             "additional_address": null,
//             "city": "Lille",
//             "zip": "59000",
//             "password": "123456",
//             "is_premium": true,
//             "role": "user",
//             "createdAt": "2020-08-20T22:34:51.607Z",
//             "updatedAt": "2020-08-20T22:34:51.607Z"
//         }
//     ]
// }