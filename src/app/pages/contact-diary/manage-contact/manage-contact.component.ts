import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailPattern, phonePattern } from '../../../config';
import { ContactDiary } from '../../../models/contact-diary.model';
import { ManageContactService } from './manage-contact.service';
import { ToasterService } from '../../../common';
import { toasterTypes } from '../../../config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss'],
})
export class ManageContactComponent implements OnInit {

  genericLoaderFlag = false;
  manageContactFormGroup: FormGroup;
  toasterTypes = toasterTypes;
  isUpdate = false;
  contactId: number;
  title = 'Add';

  constructor(
    private locationService: Location,
    private formBuilder: FormBuilder,
    private _manageContactService: ManageContactService,
    private toasterService: ToasterService,
    private activateRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.manageContactFormGroup = this.createMangeContactFormGroup();
    this.activateRouter.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.contactId = + this._manageContactService.base64Decryption(params['id']);
        this.isUpdate = true;
        this.title = 'Edit';
        this.setContact(this.contactId);
      }
    });
  }

  back(): void {
    this.locationService.back();
  }

  createMangeContactFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      profilePic: ['assets/images/male-avatar.png'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phonePattern)]],
      status: [1],
      gender: ['1'],
      deleteLoderFlag: [false],
      switchLoaderFlag: [false],
    });
  }

  setContact(id: number): void {
    this._manageContactService.getContact(id).subscribe((res: ContactDiary) => {
      this.manageContactFormGroup.setValue(res);
      this.manageContactFormGroup['controls']['gender'].setValue(res.gender.toString());
    });
  }

  genderChange(gender: string): void {
    const parsedGender = parseInt(gender, 10);
    this.manageContactFormGroup['controls']['profilePic'].setValue((parsedGender === 1) ?
      'assets/images/male-avatar.png' : 'assets/images/female-avatar.png');
  }

  save(): void {
    let contact: ContactDiary = new ContactDiary();
    contact = this.manageContactFormGroup.value;
    contact.gender = parseInt(contact.gender.toString(), 10);
    if (this.manageContactFormGroup.valid) {
      (this.isUpdate) ? this.editContact(contact) : this.addContact(contact);
    } else {
      for (const i in this.manageContactFormGroup.controls) {
        if (!this.manageContactFormGroup.controls[i].valid) {
          this.manageContactFormGroup.controls[i].markAsTouched();
        }
      }
    }
  }

  addContact(contact: ContactDiary): void {
    this.genericLoaderFlag = true;
    this._manageContactService.addContact(contact).subscribe(res => {
      setTimeout(() => {
        this.genericLoaderFlag = false;
        this.toasterService.showToast(this.toasterTypes[1], 'contact added successfully.', '');
        this.back();
      }, 1000);
    }, err => {
      this.genericLoaderFlag = false;
      this.toasterService.showToast(this.toasterTypes[4], 'problem while adding contact', '');
    });
  }

  editContact(contact: ContactDiary): void {
    this.genericLoaderFlag = true;
    this._manageContactService.updateContact(contact).subscribe(res => {
      setTimeout(() => {
        this.genericLoaderFlag = false;
        this.toasterService.showToast(this.toasterTypes[1], 'contact updated successfully.', '');
        this.back();
      }, 1000);
    }, err => {
      this.genericLoaderFlag = false;
      this.toasterService.showToast(this.toasterTypes[4], 'problem while updating contact', '');
    });
  }

}
