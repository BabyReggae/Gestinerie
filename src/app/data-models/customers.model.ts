export class Customer {
    id: number;
    name: string;
    email: string;
    nbCmd_old: number;
    nbCmd_cur: number;
    ville: string;
    date_crea:Date;
    abonnement: string
    
    constructor(
        private infoObject:any
        
    ) {

        this.id = infoObject.id,
        this.name = infoObject.name,
        this.email = infoObject.email,
        this.nbCmd_old = infoObject.nbCmd_old,
        this.nbCmd_cur = infoObject.nbCmd_cur,
        this.ville = infoObject.ville,
        this.date_crea = infoObject.date_crea,
        this.abonnement = infoObject.abonnement
    }
}