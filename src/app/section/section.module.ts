import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionsRoutes } from './section.routing';
import { CustomersComponent } from './customers/customers.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SectionsRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgbModule
    ],
    declarations: [
        CustomersComponent
    ]
  })
  export class SectionsModule {}
  