import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';


declare var $:any;

@Injectable()
export class CustomersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
        // protected alertService: AlertService, 
        // private modalService:ModalService 
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
                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id'];
                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                console.log( displayedCol )

                resolve({ 
                    title : "Clients",
                    col : colDef  ,
                    data : data, 
                    displayedCol : displayedCol
                });

            });
        });

    }

}