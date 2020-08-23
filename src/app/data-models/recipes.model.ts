export class Recipe{
    constructor(
        public id: any,
        public name: any,
        public caloric: any,
        public products: any[],
        public tags: any[],
        public steps: any[],
        public difficulty:any,
        public realisationTime:any
    ){}
}

// {
//     "id": 6,
//     "name": "Ratatouille à huile",
//     "caloric": "575",
//     "realisationTime": "60",
//     "difficulty": "medium",
//     "products": [ ],
//     "tags": [
//         "Légumes",
//         "Provence"
//     ],
//     "steps": []
// }