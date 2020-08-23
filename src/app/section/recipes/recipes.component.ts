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
      this.filterVal = params.filter != undefined ? params.filter : "";
    })
    //get token from storage session
    let fake_token = "ehoui";

    this.btnsActions = [
      // { color : "primary", content : "Editer", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ this.onUpdate = true; console.log('ecrire suite de la func upd ici ') } },
      { color : "danger", content : "Supprimer",  icon : "mdi mdi-24px mdi-delete-forever",  click_func : (e : any)=>{  this.recipesService.delete_recipe( e.id ) } },
    ]
    // prepare summary data 
    this.recipeDataPromise = this.recipesService.get_recipe( fake_token );
    this.recipeDataPromise.then((res:any)=>{ this.recipeData = JSON.parse(JSON.stringify(res.data));console.log('RECIPE COMPO LOAD DATA +> ' , this.recipeData ) })// create a copy of data // not the object instance


    this.recipesObservable = new Observable(observer => {

      this.recipeDataPromise.then( 
        ( res: any) => { 
          console.log(" local >>> " , res.data );
          
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
    this.productDataPromise = this.productsService.get_product( fake_token );
   
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
      var tmpRecipesData :any = Object.values(this.recipeData);
      var auditedRecipe:any = tmpRecipesData.filter( (recip: { id: any; }) => recip.id == e);


      this.initRecipeGestionPanel( auditedRecipe );


    };

  }

  updFunc( e : any ){ this.recipesService.update_recipe( e ) };

  addFunc( e : any ){ this.recipesService.add_recipe( e ) };

  initRecipeGestionPanel( curRecipe : any = [] ){
    console.log('recipe DISPLAY => ' , curRecipe );

    if( curRecipe.length != 0 ){
      Object
      .keys(curRecipe[0].products)
      .map(prod  => { 
        let tmpId = curRecipe[0].products[prod].id,
        tmpUnity = curRecipe[0].products[prod].unity,
        tmpImg = curRecipe[0].products[prod].image,
        tmpName = curRecipe[0].products[prod].name,
        tmpQtt = curRecipe[0].products[prod].quantity;
  
        curRecipe[0].products[prod] = {  id : tmpId, image : tmpImg, name : tmpName  , unity : tmpUnity, quantity : tmpQtt }
      }
      )
    }

    console.log('recipe CONFIG DISPLAY => ' , curRecipe );


    if( curRecipe.length != 0 ) {this.auditedRecipe = curRecipe[0]; this.onUpdate = true}
    else{
      this.auditedRecipe = new Recipe( undefined, "", "", [], [], [], "normal" , "1h" );
      this.onAdd = true;
    }

  }

  changeRecipeName( name : string ){
    this.auditedRecipe.name = name;
  }

  addProductInRecipe( el:any ){

    let tmpNewProduct:any = {
      id : el.id,
      image: el.image,
      name : el.name,
      unity: "",
      quantity: ""
      // name : el.name,
      // description : el.description,  
      // image : el.image,  
      // price : el.price, 
      // productCategoryId : el.productCategoryId, 
      // stock : el.stock 
    }

    this.auditedRecipe.products.push( tmpNewProduct );
  } 

  discardProductFromRecipe( recipeProdIndex : number ){
    console.log( "index recive => " , recipeProdIndex)

    this.auditedRecipe.products.splice( recipeProdIndex, 1 );
    console.log( this.auditedRecipe );
  }

  addStepInRecipe(){
    let newIndex: number;
    if( this.auditedRecipe.steps != undefined ) newIndex = this.auditedRecipe.steps.length + 1;
    else newIndex = 1;
    
    let newStep = { 
      order : newIndex, 
      details : "" 
    }

    this.auditedRecipe.steps.push( newStep );
  }

  changeInstructionText( val:any , index : number ){

    Object.keys(this.auditedRecipe).map( ( key ) => {   
      if( key == "steps" ){
        this.auditedRecipe[key].forEach((element: any) => {
          if( element.order == index ) element.details = val;
        });
      }
    });

  }

  changeQttText(  val:any , index : number ){
    Object.keys(this.auditedRecipe).map( ( key ) => {   
      if( key == "products" ){
        this.auditedRecipe[key].forEach((element: any) => {
          if( element.id == index ) element.quantity = val;
        });
      }
    });
  }

  changeUnitText( val:any , index : number ){
    Object.keys(this.auditedRecipe).map( ( key ) => {   
      if( key == "products" ){
        this.auditedRecipe[key].forEach((element: any) => {
          if( element.id == index ) element.unity = val;
        });
      }
    });
  }

  discardStepFromRecipe( recipeStepIndex : number ){
    this.auditedRecipe.steps.splice( recipeStepIndex, 1 );
  }

  validationRecipeGestionPanel( finalRecipe: any){
    console.log( finalRecipe , "BEFORE REQ SQL ADD or UPD " );
    Object.keys( finalRecipe.products ).map( (e)=>{ 
      let tmpId = finalRecipe.products[e].id,
      tmpUnity = finalRecipe.products[e].unity,
      tmpQtt = finalRecipe.products[e].quantity;

      finalRecipe.products[e] = { id : tmpId, unity : tmpUnity, quantity : tmpQtt };
     })

     Object.keys( finalRecipe.steps ).map( (e)=>{ 
      let tmpDetails = finalRecipe.steps[e].details,
      tmpOrder = finalRecipe.steps[e].order;

      finalRecipe.steps[e] = { order : tmpOrder, details : tmpDetails };
     })
     


     console.log("BEFORE SEND TO REQ +>> " , finalRecipe );


    if( this.onAdd ) {this.addFunc( finalRecipe );  this.onAdd = false }
    else{this.updFunc(  finalRecipe ); this.onUpdate = false }
  }

  cancelRecipeGestionPanel(){
    this.onUpdate = false;
    this.onAdd = false;
  }


}
