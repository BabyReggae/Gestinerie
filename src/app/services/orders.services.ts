import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';

// import { Customer } from "../data-models/customers.model";


declare var $:any;

@Injectable()
export class OrdersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}




    load_basicInfo( token : string ){
        
        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/orders/bacic_info?token='+ token )
            .subscribe((data : any) => {

                console.log( data, "from orders" );

                let colDef = Object.keys( data[0] );
                let UnShownedCol = ['id'];
                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                
                resolve({ 
                    title : "Commandes",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            });
        });

    }

}