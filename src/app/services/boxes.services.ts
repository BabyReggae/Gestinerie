import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';

import axios from "axios";
import { AxiosInstance } from "axios";
import { Boxe } from "../data-models/boxes.model";

declare var $:any;

@Injectable()
export class BoxesService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router
    ){}


    get_boxes( token : string ){

        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('https://radisnerie-api-production.herokuapp.com/api/baskets?id=all')
            .subscribe((data : any) => {


                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id'];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Boxe(
                        data[item].id,
                        data[item].name,
                        data[item].price,
                        data[item].description,
                        data[item].image,
                        data[item].products,
                    );  
                });
                


                resolve({ 
                    title : "Paniers",
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

    add_boxe(data:any){
        console.log( "service product add asked " , data  );
        this.httpClient
        .post("https://radisnerie-api-production.herokuapp.com/api/baskets" , data )
        .subscribe(            
            ( res : any) => {
                console.log( res , "res from api " );
                this.reload();
            },
            (err : any ) => {
                console.log('err API => ' , err );
                alert("Pas de réponse de l'API")
            }
        )


    }

    update_boxe( data : any ){
        console.log( "service product upd asked " , data  )
        this.httpClient
        .put("https://radisnerie-api-production.herokuapp.com/api/baskets" , data )
        .subscribe(            
            ( res : any) => {
                console.log( res , "res from api " );
                this.reload();
            },
            (err : any ) => {
                console.log('err API => ' , err );
                alert("Pas de réponse de l'API")
            }
        )

    }

    delete_boxe( id : string ){
        console.log( id );
        let dataBody = { id : id};

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: dataBody
        };

        this.httpClient
        .delete("https://radisnerie-api-production.herokuapp.com/api/baskets" , httpOptions )
        .subscribe(
            ( res : any) => {
                console.log( res , "res from api " );
                this.reload();
            },
            (err : any ) => {
                console.log('err API => ' , err );
                alert("Pas de réponse de l'API")
            }
            
        )


    }

    reload(){
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/section/boxes']);
        }); 
    }

}