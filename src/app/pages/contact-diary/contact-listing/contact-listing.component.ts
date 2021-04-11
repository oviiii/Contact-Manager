import { Component, OnInit } from '@angular/core';
import { ContactListingService } from './contact-listing.service';
import { ContactDiary } from '../../../models/contact-diary.model';
import { ContactStatusEnum, toasterTypes } from '../../../config';
import Swal from 'sweetalert2';
import { ToasterService } from '../../../common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss'],
})
export class ContactListingComponent implements OnInit {

  contacts: Array<ContactDiary> = [];
  contactStatusEnum = ContactStatusEnum;
  contactListingLoadingFlag = false;
  toasterTypes = toasterTypes;
  genericLoaderFlag = false;

  constructor(
    private _contactListingService: ContactListingService,
    private toasterService: ToasterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setContacts();
  }

  setContacts(): void {
    this.contactListingLoadingFlag = true;
    this.contacts = [];
    this._contactListingService.getContacts().subscribe(res => {
      // use set timeout beacuase give server effect.
      setTimeout(() => {
        this.contacts = res;
        // to fix issue for loader falgs
        this.contacts.forEach((contact: ContactDiary) => {
          contact.switchLoaderFlag = false;
          contact.deleteLoderFlag = false;
        });
        this.contactListingLoadingFlag = false;
      }, 1000);
    }, err => {
      this.contacts = [];
      this.contactListingLoadingFlag = false;
    });
  }

  updateContact(contact: ContactDiary, index: number): void {
    this.contacts[index].switchLoaderFlag = true;
    this.genericLoaderFlag = true;
    const updateContact = {...contact};
    updateContact.status = (updateContact.status === this.contactStatusEnum.Active) ?
      this.contactStatusEnum.Inactive : this.contactStatusEnum.Active;
    this._contactListingService.updateContact(updateContact).subscribe(res => {
      // use set timeout beacuase give server effect.
      setTimeout(() => {
        this.genericLoaderFlag = false;
        this.contacts[index].switchLoaderFlag = false;
        this.contacts[index].status = updateContact.status;
        this.toasterService.showToast(this.toasterTypes[1], 'status updated successfully.', '');
      }, 1000);
    }, err => {
      this.genericLoaderFlag = false;
      this.contacts[index].switchLoaderFlag = false;
      this.toasterService.showToast(this.toasterTypes[4], 'problem while updating status', '');
    });
  }

  deleteContact(id: number, index: number): void {
    this.contacts[index].deleteLoderFlag = true;
    this.genericLoaderFlag = true;
    this._contactListingService.deleteContact(id).subscribe(res => {
      // use set timeout beacuase give server effect.
      setTimeout(() => {
        this.toasterService.showToast(this.toasterTypes[1], 'contact deleted successfully.', '');
        this.contacts[index].deleteLoderFlag = false;
        this.genericLoaderFlag = false;
        this.setContacts();
      }, 1000);
    }, err => {
      this.contacts[index].deleteLoderFlag = false;
      this.genericLoaderFlag = false;
      this.toasterService.showToast(this.toasterTypes[4], 'problem while deleting contact', '');
    });
  }

  deleteContactSwal(id: number, index: number): void {
    Swal.fire({
      title: 'Delete Contact',
      text: 'Are you sure want to delete contact?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.value) {
        this.deleteContact(id, index);
      }
    });
  }

  goToManageContact(id: number = -1): void {
    this.router.navigate([((id !== -1) ?
      `pages/contact-diary/manage-contact/${this._contactListingService.base64Encryption(id.toString())}` :
    'pages/contact-diary/manage-contact')]);
  }

}
