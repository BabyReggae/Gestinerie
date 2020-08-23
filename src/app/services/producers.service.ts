import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';
import { Producer } from '../data-models/producers.model';

// import { Customer } from "../data-models/customers.model";


declare var $:any;

@Injectable()
export class ProducersService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}


    get_producers( token : string ){
        
        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://radisnerie.fr:3000/api/retailers?id=all' )
            .subscribe((data : any) => {

                let colDef = Object.keys( data[0] );
                let UnShownedCol = ['id','additional_address' , 'createdAt' , 'updatedAt' ];
                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );


                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Producer(
                        data[item].id,
                        data[item].owner_firstname,
                        data[item].owner_lastname,
                        data[item].name,
                        data[item].email,
                        data[item].address,
                        data[item].additional_address,
                        data[item].city,
                        data[item].zip,
                        data[item].phone,
                        data[item].createdAt,
                        data[item].updatedAt
                    );  
                });

                resolve({ 
                    title : "Fournisseurs",
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

    add_producers(data : any){
        console.log( 'ADD ASKED +> ' , data );
        this.httpClient
        .post("http://radisnerie.fr:3000/api/retailers" , data )
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

    upd_producers( data : any){
        console.log( "UPD asked " , data  );
        this.httpClient
        .put("http://radisnerie.fr:3000/api/retailers" , data )
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

    send_email( emailData:any ){
        console.log( "envoie d'un email ");
        console.log( emailData.email, emailData.text );

    }

    reload(){
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/section/producers']);
        }); 

    }


}