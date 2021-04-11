import { NgModule } from '@angular/core';
import { ContactListingComponent } from './contact-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ContactListingService } from './contact-listing.service';
import { UiSwitchModule } from 'ngx-ui-switch';

const routes: Routes = [
  {
    path: '',
    component: ContactListingComponent,
  },
];

@NgModule({
  declarations: [
    ContactListingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#28a745',
      switchColor: '#ffffff',
      defaultBgColor: '#dc3545',
    }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    ContactListingService,
  ],
})
export class ContactListingModule { }
