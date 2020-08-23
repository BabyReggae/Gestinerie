import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CustomersService } from "../../services/customers.service";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs-compat/operator/filter';
import { FormBuilder } from '@angular/forms';

import { ProducersService } from "../../services/producers.service";
import { ProductsService } from '../../services/products.service';



@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit {

  @ViewChild('content_modalMail') content_modalMail: any;

  mainData: any;
  producersObservable:any;
  productsObservable:any;

  checkoutForm:any;
  closeResult:any;
  btnsActions : any = [];
  filterVal : any = "";
  modalData: any = {};

  addFunc:any;
  updFunc:any;

  openDeliveryGestion:any;
  btnsAddableProductActions:any;

  onObserve:any;

  constructor( private producersService : ProducersService, private productService : ProductsService, private router: Router,private route: ActivatedRoute, private modalService: NgbModal, private formBuilder : FormBuilder ) {
  }

  ngOnInit(): void {
    //get optional init filter value
    this.route.queryParams.subscribe(params => {
      console.log( params );
      this.filterVal = params.filter != undefined ? params.filter : "";
    })

    //get token from storage session
    let fake_token = "ehoui";

    //instanciate save func 
    this.addFunc = ( e : any )=>{ this.producersService.add_producers( e ) };
    this.updFunc = ( e : any )=>{ this.producersService.upd_producers( e ) };

    this.btnsActions = [
      // { color : "primary", content : "Voir les commandes", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{   } },
      { color : "warning", content : "Mailer",  icon : "mdi mdi-24px mdi-email",  click_func : (e:any)=>{ this.open_emailModal( this.content_modalMail, e.email ) }  },
    ]


    // prepare summary data 
    this.mainData = this.producersService.get_producers( fake_token );
   
    this.producersObservable = new Observable(observer => {

      this.mainData.then( 
        ( res: any) => { 
          observer.next( res );
        },
        ( err: any) => { console.log('ça, sa pue') } 
      )
        // observer.complete();
    });
  }



	open_emailModal(content_modal:string, emailAdress:any ) {

    this.modalData = { email :emailAdress, text : "" },

    console.log(  content_modal , emailAdress , "datas from open email<<<< ")

    this.checkoutForm = this.formBuilder.group( this.modalData );
    console.log( this.checkoutForm );
    
		this.modalService.open( content_modal, {ariaLabelledBy: 'modal-basic-title', size : "lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }


  onSubmit( data:any){
    console.log( data );
    this.producersService.send_email( data );
  }

  private getDismissReason(reason: ModalDismissReasons): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}


}
