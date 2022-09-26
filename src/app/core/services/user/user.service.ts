import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { EditUserPayload } from '../../models/EditUserPayload';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = endpoints.users;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL).pipe(delay(500));
  }

  getUser(id: number): Observable<User> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<User>(url).pipe(delay(500));
  }
  editUser(id: number, payload: EditUserPayload): Observable<User> {
    const url = `${this.baseURL}/${id}`;

    return this.http.put<User>(url, payload).pipe(delay(500));
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.baseURL}/${id}`;

    return this.http.delete<void>(url).pipe(delay(500));
  }
}
