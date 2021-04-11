import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ContactDiary } from '../models/contact-diary.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataBaseService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 1,
        profilePic: 'assets/images/female-avatar.png',
        firstName: 'Sneha',
        lastName: 'Mahaik',
        email: 'sneha@gmail.com',
        phoneNumber: '478-993-7545',
        status: 1,
        gender: 1,
        deleteLoderFlag: false,
        switchLoaderFlag: false,
      },
      {
        id: 2,
        profilePic: 'assets/images/male-avatar.png',
        firstName: 'Sanket',
        lastName: 'Mahaik',
        email: 'sanket@gmail.com',
        phoneNumber: '435-712-8045',
        status: 1,
        gender: 2,
        deleteLoderFlag: false,
        switchLoaderFlag: false,
      },
      {
        id: 3,
        profilePic: 'assets/images/female-avatar.png',
        firstName: 'Sandhya',
        lastName: 'Mahadik',
        email: 'sandhya@gmail.com',
        phoneNumber: '803-566-5473',
        status: 1,
        gender: 1,
        deleteLoderFlag: false,
        switchLoaderFlag: false,
      },
      {
        id: 4,
        profilePic: 'assets/images/male-avatar.png',
        firstName: 'Suresh',
        lastName: 'Mahadik',
        email: 'suresh@gmail.com',
        phoneNumber: '949-651-3960',
        status: 2,
        gender: 2,
        deleteLoderFlag: false,
        switchLoaderFlag: false,
      },

    ];
    return { contacts };
  }

  genId(contacts: ContactDiary[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1;
  }
}
