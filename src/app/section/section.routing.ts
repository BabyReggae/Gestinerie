import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProducersComponent } from './producers/producers.component';
import { BoxesComponent } from './boxes/boxes.component';

export const SectionsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'boxes',
				component: BoxesComponent,
				data: {
					title: 'Paniers',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Paniers' }
					]
				}
			},
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
			},
			{
				path: 'orders',
				component: OrdersComponent,
				data: {
					title: 'Commandes',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Commandes' }
					]
				}
			},
			{
				path: 'producers',
				component: ProducersComponent,
				data: {
					title: 'Producteurs',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Producteurs' }
					]
				}
            }
        ]
	}
];
