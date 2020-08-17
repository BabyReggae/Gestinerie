import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { filter } from 'rxjs-compat/operator/filter';
import { DataTableComponent } from 'app/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cpuUsage } from 'process';
import { isNumber } from 'util';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



let ELEMENT_DATA: any[] = [ //PeriodicElement
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-staychill',
  templateUrl: './staychill.component.html',
  styleUrls: ['./staychill.component.css']
})




export class StaychillComponent implements OnInit{

  constructor(private modalService: NgbModal,  private formBuilder : FormBuilder ){



  }

  @Input() savefunc:any;
  @Input() answers!: Observable<any[]>;

  displayedColumns: any[] = [];
  colDef: any[] = [];
  tableTitle:any;
  modalData: any[] = [];
  closeResult: string='';
  checkoutForm:any;
  formObjectData:any;


  // mainDataColDisplay



  ngOnInit(){
    //http://localhost:8080/api/customers/bacic_info?token=coucou
    this.dataSource = new MatTableDataSource( ELEMENT_DATA );

    this.answers.subscribe({

      //fill component vars
      next: (value: any) => {

        ELEMENT_DATA = Object.values( value.data );

        this.tableTitle = value.title;
        this.colDef = value.col;
        this.displayedColumns = value.displayedCol;


        this.displayedColumns.push( "Action" );
        
        this.update_tableData( ELEMENT_DATA );

        console.log( this );

        

      },
      error: (err: any) => console.error(err),
      complete: () => console.log('DONE!')
  });




  }

  dataSource = new MatTableDataSource( ELEMENT_DATA );
  @ViewChild(MatSort) sort : MatSort | any;

  
  update_tableData( newdatas : any ){
    this.dataSource = new MatTableDataSource( newdatas );
    this.dataSource.sort = this.sort;
  }

  getData(row:any){
    console.log(row)
  }

  applyFilter( filterValue : string ){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayModifModal( id : number ){
    console.log( id )
  }

  createForm( data:any){
    console.log( data );



    this.checkoutForm = this.formBuilder.group( data );

  }

  
	open_modal(content_modal:string, datas:any ) {

    this.modalData = [];
    let input_loadData : any = {};

    for (const key in datas) {
      if (Object.prototype.hasOwnProperty.call(datas, key)) {
        
        const element = datas[key];
        const isAnDate = ( Date.parse( element ).toString() != "NaN" ) && !isNumber( element );
        const isUpdatable = false;

        input_loadData[ key ] = element;
        this.modalData.push( [ key , element, isAnDate, isUpdatable ] );


      }
    }

    this.createForm( input_loadData );

    
		this.modalService.open(content_modal, {ariaLabelledBy: 'modal-basic-title', size : "lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  onSubmit( data:any){
    this.savefunc( data );
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




