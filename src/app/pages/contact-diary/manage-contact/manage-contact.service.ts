import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContactDiary } from '../../../models/contact-diary.model';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class ManageContactService {

  private contactsUrl = 'api/contacts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** GET contact by id. Will 404 if id not found */
  getContact(id: number): Observable<ContactDiary> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<ContactDiary>(url).pipe(
      // tslint:disable-next-line:no-console
      tap(_ => console.log(`fetched conatact id=${id}`)),
      catchError(this.handleError<ContactDiary>(`getContact id=${id}`)),
    );
  }

  /** PUT: update the contact on the server */
  updateContact(contact: ContactDiary): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      // tslint:disable-next-line:no-console
      tap(_ => console.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact')),
    );
  }

  /** POST: add a new hero to the server */
  addContact(contact: ContactDiary): Observable<ContactDiary> {
    return this.http.post<ContactDiary>(this.contactsUrl, contact, this.httpOptions).pipe(
      // tslint:disable-next-line:no-console
      tap((newHero: ContactDiary) => console.log(`added contact w/ id=${newHero.id}`)),
      catchError(this.handleError<ContactDiary>('addHero')),
    );
  }

  base64Decryption(msg: string): string {
    return atob(msg);
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
