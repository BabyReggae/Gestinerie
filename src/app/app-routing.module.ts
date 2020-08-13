import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuard } from './services/auth-guard.service';

export const Approutes: Routes = [
    {
        path: '',
        canActivate : [AuthGuard],
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'component',
                loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
            },
            {
                path: 'section',
                loadChildren: () => import('./section/section.module').then(m => m.SectionsModule)
            }
        ]
    },

    {
        path:'auth',
        component: AuthentificationComponent
    },
    {
        path: '**',
        redirectTo: '/auth'
    },
];
