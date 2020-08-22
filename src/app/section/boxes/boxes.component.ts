import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { BoxesService } from "../../services/boxes.services";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs-compat/operator/filter';

import { Boxe } from "../../data-models/boxes.model";

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  boxeDataPromise: any;
  boxeData:any;
  productDataPromise:any;
  productData:any;

  boxesObservable:any;
  productsObservable:any;

  btnsActions : any = [];
  btnsAddableProductActions : any = [];
  filterVal : any = "";

  openBoxeGestion : any;
  auditedBoxe: any;

  onUpdate: boolean = false;
  onAdd: boolean = false;

  constructor( private boxesService : BoxesService, private productsService : ProductsService, private router: Router,private route: ActivatedRoute ) {
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
      { color : "danger", content : "Supprimer",  icon : "mdi mdi-24px mdi-delete-forever",  click_func : (e : any)=>{  this.boxesService.delete_boxe( e.id ) } },
    ]
    // prepare summary data 
    this.boxeDataPromise = this.boxesService.get_boxes( fake_token );
    this.boxeDataPromise.then((res:any)=>{ this.boxeData = JSON.parse(JSON.stringify(res.data)) })// create a copy of data // not the object instance


    this.boxesObservable = new Observable(observer => {

      this.boxeDataPromise.then( 
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
      { color : "success", content : "Ajouter", icon : "mdi mdi-24px mdi-plus", click_func : (e: any)=>{ this.addProductInBoxe( e ) } }
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
    

    this.openBoxeGestion = ( e : any )=>{ 
      this.onAdd = true;
      var tmpBoxesData :any = Object.values(this.boxeData);
      var auditedBoxe:any = tmpBoxesData.filter( (recip: { id: any; }) => recip.id == e);

      console.log( "result of reseach => " ,  );

      this.initBoxeGestionPanel( auditedBoxe );


    };

  }

  updFunc( e : any ){ this.boxesService.update_boxe( e ) };

  addFunc( e : any ){ this.boxesService.add_boxe( e ) };

  initBoxeGestionPanel( curBoxe : any = [] ){
    this.auditedBoxe = curBoxe.length != 0 ? curBoxe[0] : new Boxe( undefined, "", "", "", "", [] )
  }

  changeBoxeName( name : string ){
    this.auditedBoxe.name = name;
  }

  addProductInBoxe( el:any ){

    let tmpNewProduct:any = { 
      id : el.id,
      name : el.name,
      description : el.description,  
      image : el.image,  
      price : el.price, 
      productCategoryId : el.productCategoryId, 
      stock : el.stock }

    this.auditedBoxe.products.push( tmpNewProduct );
  } 

  discardProductFromBoxe( boxeProdIndex : number ){
    console.log( "index recive => " , boxeProdIndex)

    this.auditedBoxe.products.splice( boxeProdIndex, 1 );
    console.log( this.auditedBoxe );
  }

  validationBoxeGestionPanel( finalBoxe: any){
    console.log( finalBoxe , "BEFORE REQ SQL ADD or UPD " );
  }

  cancelBoxeGestionPanel(){
    this.onUpdate = false;
    this.onAdd = false;
  }


}
