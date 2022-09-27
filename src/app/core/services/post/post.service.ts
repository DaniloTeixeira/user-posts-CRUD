import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { CreatePostResponse } from '../../interfaces/CreatePostResponse';
import { Post } from '../../interfaces/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseURL = endpoints.post;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    const url = `${this.baseURL}s`;

    return this.http.get<Post[]>(url).pipe(delay(500));
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<Post>(url);
  }

  createPost(id: number, content: string): Observable<string> {
    const url = `${this.baseURL}/create-post/userId/${id}`;

    return this.http.post<string>(url, content);
  }

  editPost(id: number, content: string): Observable<CreatePostResponse> {
    const url = `${this.baseURL}/${id}`;

    return this.http.put<CreatePostResponse>(url, content).pipe(delay(500));
  }

  deletePost(id: number): Observable<string> {
    const url = `${this.baseURL}/${id}`;

    return this.http.delete<string>(url);
  }
}
