export class Product{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public image: string,
        public stock: number,
        public productCategoryId: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}