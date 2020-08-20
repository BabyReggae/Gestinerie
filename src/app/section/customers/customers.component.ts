import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CustomersService } from "../../services/customers.service";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs-compat/operator/filter';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('content_modalMail') content_modalMail: any;

  mainData: any;
  customerObservable:any;
  checkoutForm:any;
  closeResult:any;
  btnsActions : any = [];
  filterVal : any = "";
  modalData: any = {};
  saveFunc:any;

  constructor( private customerService : CustomersService, private productService : ProductsService, private router: Router,private route: ActivatedRoute, private modalService: NgbModal, private formBuilder : FormBuilder ) {
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
    this.saveFunc = ( e : any )=>{ this.customerService.update( e ) };

    this.btnsActions = [
      { color : "primary", content : "Voir les commandes", icon : "mdi mdi-24px mdi-eye", click_func : (e: any)=>{ console.log('arr func data => ' , e );this.router.navigate(['section/orders']) } },
      { color : "warning", content : "Mailer",  icon : "mdi mdi-24px mdi-email",  click_func : (e:any)=>{  console.log( "receive customer side >> ", e );this.open_emailModal( this.content_modalMail, e.email ) }  },
    ]


    // prepare summary data 
    this.mainData = this.customerService.load_basicInfo( fake_token );
   
    this.customerObservable = new Observable(observer => {

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

  see_related_cmd(){
    this.router.navigate(['section/orders'])
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
    this.customerService.send_email( data )
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
