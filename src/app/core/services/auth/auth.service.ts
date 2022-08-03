import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { CreateUserPayload } from '../../modules/auth/interfaces/CreateUserPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(payload: CreateUserPayload): Observable<string> {
    const url = endpoints.user;

    return this.http.post<string>(url, payload);
  }
}
