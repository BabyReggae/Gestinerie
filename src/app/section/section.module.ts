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


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SectionsRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgbModule
    ],
    declarations: [
        CustomersComponent,
        ProducersComponent,
        OrdersComponent,
        BoxesComponent
    ]
  })
  export class SectionsModule {}
  