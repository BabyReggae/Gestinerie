import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';
import axios from "axios";
import { AxiosInstance } from "axios";

import { Customer } from "../data-models/customers.model";



declare var $:any;

@Injectable()
export class CustomersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}

    test_fct(){ //async
        console.log( 'COUCOU ');
        // var settings = {
        //     "url": "http://radisnerie.fr:3000/api/products",
        //     "method": "GET",
        //     "timeout": 0,
        //     "headers": {
        //       "Content-Type": "application/json"
        //     },
        //     "data": JSON.stringify({"id":"ALL"}),
        //   };
          


        // let resAxio = await axios({
        //     url: 'http://radisnerie.fr:3000/api/users',
        //     method: 'GET',
        //     data: {id: 'ALL'}
        // })

        // //  resAxio.then((data)=>{
        // //     console.log( "below is the res of api VV")
        // //     console.log( data );
        // //  })  
        // console.log( resAxio );
    }

    get_customers( token : string ){
        return new Promise( (resolve, reject) => {

            this.httpClient
            // .get('http://localhost:8080/api/customers/bacic_info?token='+ token )
            .get('http://radisnerie.fr:3000/api/users?id=all' )
            .subscribe((data : any) => {

                console.log( data, "from service" );

                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id' , "address" , "password", /*"role",*/  "creditCards" , "createdAt" , "updatedAt", "commands"];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data)
                .map(item => { 
                    let preparedConstructor = data[item];

                    data[item] = new Customer(
                        data[item].id,
                        data[item].firstname,
                        data[item].lastname,
                        data[item].email,
                        data[item].address,
                        data[item].additional_address,
                        data[item].city,
                        data[item].zip,
                        data[item].password,
                        data[item].is_premium,
                        data[item].role,
                        data[item].createdAt,
                        data[item].updatedAt,
                        data[item].creditCards,
                        data[item].commands
                    );  
                });
                
                resolve({ 
                    title : "Clients",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            },
            (err : any ) => {
                console.log('err API => ' , err );
                alert("Pas de réponse de l'API")
            });
        });

    }

    upd_customers(data : any){
        //expected customer object
        console.log( "make a post request to update dataas customers" , data );

        this.httpClient
        .put("http://radisnerie.fr:3000/api/users" , data )
        .subscribe(
            ( res : any) => {
                console.log( res , "res from api " );
                this.reload();
            },
            ( err : any ) => {
                console.log( "an error occured with the api ");
            }
        )
    }

    send_email( emailData:any ){
        console.log( "envoie d'un email ");
        console.log( emailData.email, emailData.text );

    }

    
    reload(){
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/section/customers']);
        }); 

    }

}