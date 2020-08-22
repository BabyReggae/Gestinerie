import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders.services";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Order } from "../../data-models/orders.model";
import { BoxesService } from '../../services/boxes.services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {


  ordersData: any;
  boxesData:any;

  filterVal: any = "";
  orderObservable:any;
  boxesObservable:any;

  ordersDataPromise:any;
  boxesDataPromise:any;

  btnsActions : any = [];
  btnsAddableBoxesActions:any = [];


  auditedOrder:any;
  onUpdate:boolean = false;

  openOrderGestion:any;

  //front only
  displayeddeliveryStatus:any;
  statusDict: any = { 'VALIDATED' : 'Validée' , 'PREPARATION' : 'En préparation', 'SENT' : 'Envoyée', 'RECEIVED' : 'Délivrée'  };

  constructor( private orderService : OrdersService, private boxesService : BoxesService, private router: Router ) {
  }

  ngOnInit(): void {

    //get token from storage session
    let fake_token = "ehoui";

    this.btnsActions = [
      // { color : "primary", content : "Voir la commande", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ console.log('SEE cmd asked , data  => ' , e )  }},
      { color : "info", content : "Voir fiche Client",  icon : "mdi mdi-24px mdi-clipboard-account",  click_func : (e: any)=>{this.router.navigate(['section/customers'], { queryParams: { filter : e.idClient } } ) }  },
    ]

    // prepare summary data 
    this.ordersDataPromise = this.orderService.get_orders( fake_token );
    this.ordersDataPromise.then((res:any)=>{ this.ordersData = JSON.parse(JSON.stringify(res.data)) })// create a copy of data // not the object instance
   
    this.orderObservable = new Observable(observer => {

      this.ordersDataPromise.then( 
        ( res: any) => { 

          observer.next( res );
          console.log(  " observer emit" );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });


    /* *************************************************************************** */
    /* ********** LOAD DES DATA BOXES  ****************************************** */
    /* *************************************************************************** */

    
    this.btnsAddableBoxesActions = [
      // { color : "success", content : "Ajouter", icon : "mdi mdi-24px mdi-plus", click_func : (e: any)=>{ this.addBoxeInOrder( e ) } }
    ]

    // prepare summary data 
    this.boxesDataPromise = this.boxesService.get_boxes( fake_token );
    this.boxesDataPromise.then((res:any)=>{ this.boxesData = JSON.parse(JSON.stringify(res.data)) })
   
    this.boxesObservable = new Observable(observer => {

      this.boxesDataPromise.then( 
        ( res: any) => { 
          this.boxesData = res.data;
          observer.next( res );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });

    //modif for orders
    this.openOrderGestion = ( e : any )=>{ 
      this.onUpdate = true;

      var tmpOrdersData :any = Object.values(this.ordersData);
      var auditedOrder:any = tmpOrdersData.filter( (order: { id: any; }) => order.id == e);

      this.initOrderGestionPanel( auditedOrder );
    };


  }


  initOrderGestionPanel( curRecipe : any = [] ){
    console.log( curRecipe , "check Dat <<<<< ");
    this.auditedOrder = curRecipe[0];
    let tmpStatus = this.auditedOrder.deliveryStatus;
    this.displayeddeliveryStatus = this.statusDict[tmpStatus];
  }

  change_orderStatus( name : string, frontName:any ){
    this.auditedOrder.deliveryStatus = name;
    this.displayeddeliveryStatus = frontName;
  }


  addBoxeInOrder( el:any ){

    let tmpNewBox:any = { 
      id : el.id,
      name : el.name,
      description : el.description,  
      image : el.image,  
      price : el.price, 
      products : el.products, 
    }

    this.auditedOrder.boxes.push( tmpNewBox );

    console.log( this.auditedOrder.boxes );
  } 

  discardBoxeFromOrder( recipeProdIndex : number ){
    console.log( "index recive => " , recipeProdIndex)

    this.auditedOrder.products.splice( recipeProdIndex, 1 );
    console.log( this.auditedOrder );
  }

  validationOrderGestionPanel( finalOrder: any){
    console.log( finalOrder , "BEFORE REQ SQL ADD or UPD " );
    if( this.onUpdate ) { this.orderService.upd_orders( finalOrder ) ;this.onUpdate = false }

  }

  cancelOrderGestionPanel(){
    this.onUpdate = false;
  }

  send_upd(  data : any ){
    console.log( data , "<3" );
  }

  see_related_cmd(){
    this.router.navigate(['section/orders'])
  }


}


