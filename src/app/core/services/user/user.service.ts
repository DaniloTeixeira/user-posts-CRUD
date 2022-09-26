import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
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
}
