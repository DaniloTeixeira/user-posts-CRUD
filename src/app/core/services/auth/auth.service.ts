import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { CreateUserPayload } from '../../modules/auth/interfaces/CreateUserPayload';
import { User } from '../../modules/auth/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = endpoints.user;

  constructor(private http: HttpClient) {}

  createUser(payload: CreateUserPayload): Observable<User> {
    const url = `${this.baseURL}/create-user`;

    return this.http.post<User>(url, payload);
  }
}
