import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContactDiary } from '../../../models/contact-diary.model';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class ContactListingService {

  private contactsUrl = 'api/contacts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** GET contacts from the server */
  getContacts(): Observable<ContactDiary[]> {
    return this.http.get<ContactDiary[]>(this.contactsUrl).pipe(
      // tslint:disable-next-line:no-console
      tap(_ => console.log('fetched contacts')),
      catchError(this.handleError<ContactDiary[]>('getContacts', [])),
    );
  }

  /** DELETE: delete the contact from the server */
  deleteContact(hero: ContactDiary | number): Observable<ContactDiary> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<ContactDiary>(url, this.httpOptions).pipe(
      // tslint:disable-next-line:no-console
      tap(_ => console.log(`deleted contact id=${id}`)),
      catchError(this.handleError<ContactDiary>('deleteContact')),
    );
  }

  base64Encryption(msg: string): string {
    return btoa(msg);
  }

  /** PUT: update the contact on the server */
  updateContact(contact: ContactDiary): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      // tslint:disable-next-line:no-console
      tap(_ => console.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact')),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error, 'operation=', operation); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
