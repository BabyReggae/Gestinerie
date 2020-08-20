import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders.services";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {


  mainData: any;
  orderObservable:any;
  btnsActions : any = [];
  filterVal: any = "";

  constructor( private orderService : OrdersService, private router: Router ) {
  }

  ngOnInit(): void {

    



    //get token from storage session
    let fake_token = "ehoui";

    this.btnsActions = [
      // { color : "primary", content : "Voir les commandes", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ console.log('arr func data => ' , e );this.router.navigate(['section/orders']) } },
      { color : "info", content : "Voir fiche Client",  icon : "mdi mdi-24px mdi-clipboard-account",  click_func : (e: any)=>{this.router.navigate(['section/customers'], { queryParams: { filter : e.idClient } } ) }  },
    ]


    // prepare summary data 
    this.mainData = this.orderService.load_basicInfo( fake_token );
   
    this.orderObservable = new Observable(observer => {

      this.mainData.then( 
        ( res: any) => { 

          observer.next( res );
          console.log(  " observer emit" );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });
  }

  send_upd(  data : any ){
    console.log( data , "<3" );
  }


  direbonjour(){
    alert('bonjour')
  }

  see_related_cmd(){
    this.router.navigate(['section/orders'])
  }


}


