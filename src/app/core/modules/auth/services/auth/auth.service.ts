import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { SignInPayload } from '../../interfaces/SignInPayload';
import { SignInResponse } from '../../interfaces/SignInResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(payload: SignInPayload): Observable<any> {
    const baseURL = endpoints.auth;
    const url = `${baseURL}/login`;

    return this.http.post<SignInResponse>(url, payload);
  }
}
