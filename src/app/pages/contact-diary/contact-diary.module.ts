import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDiaryComponent } from './contact-diary.component';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: ContactDiaryComponent,
    children: [
      {
        path: 'contact-listing',
        loadChildren: () => import('./contact-listing/contact-listing.module')
          .then(m => m.ContactListingModule),
      },
      {
        path: 'manage-contact',
        loadChildren: () => import('./manage-contact/manage-contact.module')
          .then(m => m.ManageContactModule),
      },
      {
        path: 'manage-contact/:id',
        loadChildren: () => import('./manage-contact/manage-contact.module')
          .then(m => m.ManageContactModule),
      },
      {
        path: '',
        redirectTo: 'contact-listing',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [
    ContactDiaryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ContactDiaryModule { }
