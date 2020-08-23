import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


    get_product( token : string ){

        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://radisnerie.fr:3000/api/products?id=all' )
            // .get('http://localhost:8080/api/products/bacic_info?token=coucou' )
            .subscribe((data : any) => {


                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id','createdAt', 'description', 'updatedAt', 'sellable' , 'productCategoryId '];

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
                        data[item].sellable,
                        data[item].createdAt,
                        data[item].updatedAt
                    );  
                });
                
                console.log( "ON LOAD PRODUCTS ! " , data );

                resolve({ 
                    title : "Produits",
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

    add_product(data:any){
        console.log( "service product add asked " , data  );

        let dataBody = {
            "name": data.name,
            "description": data.description,
            "price": data.price,
            "image": data.image,
            "stock": data.stock,
            "sellable" : true,
            "productCategoryId": data.productCategoryId
        }

        console.log("BODY DE LA REQ => " , dataBody );

        this.httpClient
        .post("http://radisnerie.fr:3000/api/products" , dataBody )
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

    update_product( data : any ){
        console.log( "service product upd asked " , data  );
        let dataBody = {
            "id" : data.id,
            "name": data.name,
            "description": data.description,
            "price": data.price,
            "image": data.image,
            "stock": data.stock,
            "sellable" : true,
            "productCategoryId": data.productCategoryId
        }

        this.httpClient
        .put("http://radisnerie.fr:3000/api/products" , dataBody )
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

    delete_product( id : string ){
        console.log( "service product delete  asked " , id  );
        let dataBody = { id : id};

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: dataBody
        };

        this.httpClient
        .delete("http://radisnerie.fr:3000/api/products" , httpOptions )
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
            this.router.navigate(['/section/products']);
        }); 

    }

}