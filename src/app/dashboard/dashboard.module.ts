import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DataTableComponent } from 'app/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Dashboard' }
            ]
        },
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule, 
        RouterModule.forChild(routes), 
        ChartsModule, 
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        DashboardComponent,
        // StaychillComponent,
        DataTableComponent
    ]
})
export class DashboardModule{ 


}
