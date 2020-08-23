import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { title } from 'process';

import axios from "axios";
import { AxiosInstance } from "axios";
import { Recipe } from "../data-models/recipes.model";

declare var $:any;

@Injectable()
export class RecipesService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
    ){}


    get_recipe( token : string ){

        return new Promise( (resolve, reject) => {
            
            this.httpClient
            // .get('http://localhost:8080/api/recipes/bacic_info?token='+ token )
            .get("http://radisnerie.fr:3000/api/recipes?id=all" )
            .subscribe(
                (data : any) => {


                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id' , 'realisationTime'];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Recipe(
                        data[item].id,
                        data[item].name,
                        data[item].caloric,
                        data[item].products,
                        data[item].tags,
                        data[item].steps,
                        data[item].difficulty,
                        data[item].realisationTime,
                        
                    );  
                });

                resolve({ 
                    title : "Recettes",
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

    add_recipe(data:any){
        console.log( "service RECIPE ADD asked " , data  );
        this.httpClient
        .post("http://radisnerie.fr:3000/api/recipes" , data )
        .subscribe(            
        ( res : any) => {
            console.log( res , "res from api ADD WAY" );
            this.reload();
        },
        (err : any ) => {
            console.log('err API => ' , err );
            alert("Pas de réponse de l'API")
        })

    }

    update_recipe( data : any ){
        console.log( "service RECIPE UPD asked " , data  )
        this.httpClient
        .put("http://radisnerie.fr:3000/api/recipes" , data )
        .subscribe(            
        ( res : any) => {
            console.log( res , "res from api UPDATED WAY " );
            this.reload();
        },
        (err : any ) => {
            console.log('err API => ' , err );
            alert("Pas de réponse de l'API")
        })
    }

    delete_recipe( id : string ){
        let dataBody = { id : id};

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: dataBody
        };

        this.httpClient
        .delete("http://radisnerie.fr:3000/api/recipes" , httpOptions )
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
            this.router.navigate(['/section/recipes']);
        }); 

    }

}