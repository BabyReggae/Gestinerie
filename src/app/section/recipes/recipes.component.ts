import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { RecipesService } from "../../services/recipes.services";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs-compat/operator/filter';

import { Recipe } from "../../data-models/recipes.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeDataPromise: any;
  recipeData:any;
  productDataPromise:any;
  productData:any;

  recipesObservable:any;
  productsObservable:any;

  btnsActions : any = [];
  btnsAddableProductActions : any = [];
  filterVal : any = "";

  openRecipeGestion : any;
  auditedRecipe: any;

  onUpdate: boolean = false;
  onAdd: boolean = false;

  constructor( private recipesService : RecipesService, private productsService : ProductsService, private router: Router,private route: ActivatedRoute ) {
  }

  ngOnInit(): void {

    /* *************************************************************************** */
    /* ********** LOAD DES DATA RECIPES ****************************************** */
    /* *************************************************************************** */
    //get optional init filter value
    this.route.queryParams.subscribe(params => {
      console.log( params );
      this.filterVal = params.filter != undefined ? params.filter : "";
    })
    //get token from storage session
    let fake_token = "ehoui";

    this.btnsActions = [
      // { color : "primary", content : "Editer", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ this.onUpdate = true; console.log('ecrire suite de la func upd ici ') } },
      { color : "danger", content : "Supprimer",  icon : "mdi mdi-24px mdi-delete-forever",  click_func : (e : any)=>{  this.recipesService.delete_recipe( e.id ) } },
    ]
    // prepare summary data 
    this.recipeDataPromise = this.recipesService.load_basicInfo( fake_token );
    this.recipeDataPromise.then((res:any)=>{ this.recipeData = JSON.parse(JSON.stringify(res.data)) })// create a copy of data // not the object instance


    this.recipesObservable = new Observable(observer => {

      this.recipeDataPromise.then( 
        ( res: any) => { 
          console.log(" local >>> " , res.data );
          
          // mettre les valeurs dans une variable this.thecompoentn pour retrouver la recette correspondantes avec l'id reçu depuis chillcomponent ...  MERCI et GOOD LUCK DUDE =) ( oui je me parle a moi , meme et alolrs ya quoi )

          observer.next( res );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });


    /* *************************************************************************** */
    /* ********** LOAD DES DATA PRODUCTS ****************************************** */
    /* *************************************************************************** */

    
    this.btnsAddableProductActions = [
      { color : "success", content : "Ajouter", icon : "mdi mdi-24px mdi-plus", click_func : (e: any)=>{ this.addProductInRecipe( e ) } }
    ]

    // prepare summary data 
    this.productDataPromise = this.productsService.load_basicInfo( fake_token );
   
    this.productsObservable = new Observable(observer => {

      this.productDataPromise.then( 
        ( res: any) => { 
          this.productData = res.data;
          observer.next( res );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });


    //GESTION DES MODFIS SUR LES RECETTES
    

    this.openRecipeGestion = ( e : any )=>{ 
      this.onAdd = true;
      var tmpRecipesData :any = Object.values(this.recipeData);
      var auditedRecipe:any = tmpRecipesData.filter( (recip: { id: any; }) => recip.id == e);

      console.log( "result of reseach => " ,  );

      this.initRecipeGestionPanel( auditedRecipe );


    };

  }

  updFunc( e : any ){ this.recipesService.update_recipe( e ) };

  addFunc( e : any ){ this.recipesService.add_recipe( e ) };

  initRecipeGestionPanel( curRecipe : any = [] ){
    this.auditedRecipe = curRecipe.length != 0 ? curRecipe[0] : new Recipe( undefined, "", "", [] )
  }

  changeRecipeName( name : string ){
    this.auditedRecipe.name = name;
  }

  addProductInRecipe( el:any ){

    let tmpNewProduct:any = { 
      id : el.id,
      name : el.name,
      description : el.description,  
      image : el.image,  
      price : el.price, 
      productCategoryId : el.productCategoryId, 
      stock : el.stock }

    this.auditedRecipe.products.push( tmpNewProduct );

    console.log( this.auditedRecipe.products );
  } 

  discardProductFromRecipe( recipeProdIndex : number ){
    console.log( "index recive => " , recipeProdIndex)

    this.auditedRecipe.products.splice( recipeProdIndex, 1 );
    console.log( this.auditedRecipe );
  }

  validationRecipeGestionPanel( finalRecipe: any){
    console.log( finalRecipe , "BEFORE REQ SQL ADD or UPD " );
  }

  cancelRecipeGestionPanel(){
    this.onUpdate = false;
    this.onAdd = false;
  }


}
