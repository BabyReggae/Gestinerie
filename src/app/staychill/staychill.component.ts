import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { filter } from 'rxjs-compat/operator/filter';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cpuUsage } from 'process';
import { isNumber } from 'util';
import { Recipe } from '../data-models/recipes.model';


let ELEMENT_DATA: any[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];

@Component({
  selector: 'app-staychill',
  templateUrl: './staychill.component.html',
  styleUrls: ['./staychill.component.css']
})




export class StaychillComponent implements OnInit{

  constructor(private modalService: NgbModal,  private formBuilder : FormBuilder, private router : Router ){
  }


  @Input() table_btnAction_funcs:any;
  @Input() answers!: Observable<any[]>;

  //Optionals Inputs
  @Input() updfunc:any;
  @Input() addfunc:any;
  @Input() externalAddFunc:any;
  @Input() externalUpdFunc:any;

  

  @Input() filterVal:any = "";


  //header title
  tableTitle:any;
  //consider all part of the tabled object
  colDef: any[] = [];
  //define displayed col
  displayedColumns: any[] = [];
  neededDataToAddNewLine : any[] = [];

  //hide or show "edit btn" on each row 
  editable:boolean = false;
  addElementAllow:boolean = false;
  // how did the edit modal get close ? ( save , closeIcon,click out ?)
  closeResult: string='';
  //dynamic edit form related var
  modalData: any[] = [];
  checkoutForm:any;
  formObjectData:any;
  addModal:boolean = false;
  hasExternalAddComponent:boolean=false;
  hasExternalUpdComponent:boolean=false;

  ngOnInit(){

    this.editable = ( this.updfunc != undefined );
    this.addElementAllow = ( this.addfunc != undefined );
    this.hasExternalAddComponent = ( this.externalAddFunc != undefined );
    this.hasExternalUpdComponent = ( this.externalUpdFunc != undefined );

    this.dataSource = new MatTableDataSource( ELEMENT_DATA );

    this.answers.subscribe({

      //fill component vars
      next: (value: any) => {

        ELEMENT_DATA = Object.values( value.data );

        // ELEMENT_DATA.map( a =>{ console.log(  a , "from iterate in eklementdATA ") } )

        this.tableTitle = value.title;
        this.colDef = value.col;
        this.displayedColumns = value.displayedCol;
        this.neededDataToAddNewLine = value.displayedCol;

        if( !this.displayedColumns.includes("Action") ) this.displayedColumns.push( "Action" );
        
        this.update_tableData( ELEMENT_DATA );
        this.applyFilter( this.filterVal );
      },
      error: (err: any) => console.error(err),
      complete: () => console.log('DONE!')
    });


  }

  dataSource = new MatTableDataSource( ELEMENT_DATA );
  @ViewChild(MatSort) sort : MatSort | any;

  
  update_tableData( newdatas : any ){


    newdatas = newdatas.map( (a: any) =>{
      if( a.products != undefined && typeof( a.products ) != "number" ) a.products = a.products.length;
      return a;
    })

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
    console.log( data, "of form builder <<<<<" );
    this.checkoutForm = this.formBuilder.group( data );
  }

  
	open_modal(content_modal:string, datas:any, addPurpose:any = false ) {
    this.modalData = [];
    let input_loadData : any = {};

    if( addPurpose ) this.addModal = true;else this.addModal = false;
    if( addPurpose ){
      for (const key in this.neededDataToAddNewLine ){
        this.modalData.push( [ this.neededDataToAddNewLine[key] , "", false, false ] );
        input_loadData[ this.neededDataToAddNewLine[key] ] = "";

      }
      this.createForm( input_loadData );

    }

    if( !addPurpose ){
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
    }

    
    
		this.modalService.open(content_modal, {ariaLabelledBy: 'modal-basic-title', size : "lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  onSubmit( data:any, addPurpose:any ){
    if( addPurpose ) this.addfunc( data );else this.updfunc( data );
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

  // private testFunc(){
  //   for (let index = 0; index < this.table_btnAction_funcs.length; index++) {

  //     this.table_btnAction_funcs[index].click_func();

  //   }

  // }


} 




