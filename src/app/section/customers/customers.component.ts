import { Component, OnInit } from '@angular/core';
import { CustomersService } from "../../services/customers.service";

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  mainData: any;

  constructor( private customerService : CustomersService ) {
  }

  ngOnInit(): void {
    this.customerService.test_fct();
    this.mainData = "test async";

    //get token from storage session
    let fake_token = "ehoui";

    // prepare summary data 
    this.mainData = this.customerService.load_basicInfo( fake_token );
    
  }



}
