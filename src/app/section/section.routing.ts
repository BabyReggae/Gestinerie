import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';

export const SectionsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'customers',
				component: CustomersComponent,
				data: {
					title: 'Clients',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Clients' }
					]
				}
            }
        ]
	}
];
