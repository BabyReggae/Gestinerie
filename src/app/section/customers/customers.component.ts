import { Component, OnInit } from '@angular/core';
import { CustomersService } from "../../services/customers.service";
import { Observable } from 'rxjs';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  mainData: any;
  customerObservable:any;

  constructor( private customerService : CustomersService ) {
  }

  ngOnInit(): void {
    //get token from storage session
    let fake_token = "ehoui";

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

  send_upd(  data : any ){
    console.log( data , "<3" );
  }

}
