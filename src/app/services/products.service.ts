import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';
import axios from "axios";
import { AxiosInstance } from "axios";

import { Product } from "../data-models/products.model";



declare var $:any;

@Injectable()
export class ProductsService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}


    load_basicInfo( token : string ){

        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('https://radisnerie-api-production.herokuapp.com/api/products?id=all' )
            // .get('http://localhost:8080/api/products/bacic_info?token=coucou' )
            .subscribe((data : any) => {


                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id','createdAt', 'updatedAt'];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Product(
                        data[item].id,
                        data[item].name,
                        data[item].description,
                        data[item].price,
                        data[item].image,
                        data[item].stock,
                        data[item].productCategoryId,
                        data[item].createdAt,
                        data[item].updatedAt
                    );  
                });
                


                resolve({ 
                    title : "Produits",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            });
        });

    }

    add_product(data:any){
        console.log( "service product add asked " , data  )
    }

    update_product( data : any ){
        console.log( "service product upd asked " , data  )
    }

    delete_product( id : string ){
        console.log( id );
    }

}