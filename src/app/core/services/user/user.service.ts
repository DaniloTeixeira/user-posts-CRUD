import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { EditUserPayload } from '../../interfaces/EditUserPayload';
import { User } from '../../interfaces/User';
import { SignOnPayload } from '../../interfaces/SignOnPayload';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = endpoints.user;

  constructor(private http: HttpClient) {}

  createUser(payload: SignOnPayload): Observable<User> {
    const url = `${this.baseURL}/create-user`;

    return this.http.post<User>(url, payload);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseURL}s`;

    return this.http.get<User[]>(url).pipe(delay(500));
  }

  getUserById(id: number): Observable<User> {
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
