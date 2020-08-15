import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionsRoutes } from './section.routing';
import { CustomersComponent } from './customers/customers.component';
import { ProducersComponent } from './producers/producers.component';
import { OrdersComponent } from './orders/orders.component';
import { BoxesComponent } from './boxes/boxes.component';
import { StaychillComponent } from 'app/staychill/staychill.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomersService } from 'app/services/customers.service';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SectionsRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      FormsModule, 
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule
    ],
    declarations: [
        CustomersComponent,
        ProducersComponent,
        OrdersComponent,
        BoxesComponent,
        StaychillComponent
    ],
    providers:[
      CustomersService
    ]
  })
  export class SectionsModule {}
  