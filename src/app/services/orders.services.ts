import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';
import { Order } from '../data-models/orders.model';

// import { Customer } from "../data-models/customers.model";


declare var $:any;

@Injectable()
export class OrdersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}




    get_orders( token : string ){
        
        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('https://radisnerie-api-production.herokuapp.com/api/commands?id=all' )
            .subscribe((data : any) => {

                console.log( data, "from orders" );

                let colDef = Object.keys( data[0] );
                let UnShownedCol = ['id','additional_address','date','baskets','client'];
                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );


                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Order(
                        data[item].id,
                        data[item].price,
                        data[item].address,
                        data[item].additional_address,
                        data[item].city,
                        data[item].zip,
                        data[item].deliveryDate,
                        data[item].deliveryStatus,
                        data[item].date,
                        data[item].baskets,
                        data[item].client
                    );  
                });

                resolve({ 
                    title : "Commandes",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            },
            (err : any ) => {
                console.log('err API => ' , err );
                alert("Pas de réponse de l'API")
            }
            );
        });

    }


    upd_orders( data : any){
        console.log( "service product upd asked " , data  )
        this.httpClient
        .put("https://radisnerie-api-production.herokuapp.com/api/commands" , data )
        .subscribe(            
        ( res : any) => {
            console.log( res , "res from api " );
            this.reload();
        },
        (err : any ) => {
            console.log('err API => ' , err );
            alert("Pas de réponse de l'API")
        })
    }

    reload(){
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/section/orders']);
        }); 

    }


}