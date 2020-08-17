import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';

import { Customer } from "../data-models/customers.model";


declare var $:any;

@Injectable()
export class CustomersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}


    test_fct(){
        console.log('customers service up');
    }

    load_basicInfo( token : string ){
        //http request // get 
        //http://localhost:8080/api/customers/bacic_info?token=coucou
        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/customers/bacic_info?token='+ token )
            .subscribe((data : any) => {

                console.log( data, "from service" );

                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id'];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data).map(item => { data[item] = new Customer( data[item] );  });
                


                resolve({ 
                    title : "Clients",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            });
        });

    }

}