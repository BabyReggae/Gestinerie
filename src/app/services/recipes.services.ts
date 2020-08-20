import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


    load_basicInfo( token : string ){

        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/recipes/bacic_info?token='+ token )
            .subscribe((data : any) => {


                let colDef = Object.keys( data[0] );

                let UnShownedCol = ['id'];

                let displayedCol = colDef.filter( n=> !UnShownedCol.includes(n) );

                let testy = Object.keys(data)
                .map(item => {  
                    // console.log( Object.values( data[item] ), Object.keys( data[item] ) );
                    data[item] = new Recipe(
                        data[item].id,
                        data[item].name,
                        data[item].caloric,
                        data[item].products,
                    );  
                });
                


                resolve({ 
                    title : "Recettes",
                    col : colDef,
                    data : data, 
                    displayedCol : displayedCol
                });

            });
        });

    }

    add_recipe(data:any){
        console.log( "service product add asked " , data  )
    }

    update_recipe( data : any ){
        console.log( "service product upd asked " , data  )
    }

    delete_recipe( id : string ){
        console.log( id );
    }

}