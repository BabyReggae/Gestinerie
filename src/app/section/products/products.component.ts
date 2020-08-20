import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs-compat/operator/filter';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  mainData: any;
  productsObservable:any;
  btnsActions : any = [];
  filterVal : any = "";
  updFunc : any;
  addFunc : any;

  constructor( private productsService : ProductsService, private router: Router,private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    //get optional init filter value
    this.route.queryParams.subscribe(params => {
      this.filterVal = params.filter != undefined ? params.filter : "";
    })

    //get token from storage session
    let fake_token = "ehoui";

    //instanciate save func as anomym 
    this.updFunc = ( e : any )=>{ this.productsService.update_product( e )  };

    this.addFunc = ( e : any )=>{ this.productsService.add_product( e )  }; 

    this.btnsActions = [
      // { color : "primary", content : "Voir les commandes", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ console.log('arr func data => ' , e );this.router.navigate(['section/orders']) } },
      { color : "danger", content : "Supprimer",  icon : "mdi mdi-24px mdi-delete-forever",  click_func : (e : any)=>{  this.productsService.delete_product( e.id ) } },
    ]

    // prepare summary data 
    this.mainData = this.productsService.load_basicInfo( fake_token );
   
    this.productsObservable = new Observable(observer => {

      this.mainData.then( 
        ( res: any) => { 
          observer.next( res );

        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });
  }

  // send_upd(  data : any ){

  //   console.log( "data recieve !!!! " , data  )
  //   //this.productsService.update_product( data );
  //   dat.productsService.delete_product( "789" );
  // }


  see_related_cmd(){
    this.router.navigate(['section/orders'])
  }


}
