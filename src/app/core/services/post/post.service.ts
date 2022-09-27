import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import endpoints from 'src/environments/endpoints';
import { CreateOrEditPostPayload } from '../../models/CreateOrEditPostPayload';
import { CreatePostResponse } from '../../models/CreatePostResponse';
import { Post } from '../../models/Post';

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

  createPost(id: number, content: CreateOrEditPostPayload): Observable<string> {
    const url = `${this.baseURL}/create-post/userId/${id}`;

    return this.http.put<string>(url, content);
  }

  editPost(
    id: number,
    content: CreateOrEditPostPayload
  ): Observable<CreatePostResponse> {
    const url = `${this.baseURL}/${id}`;

    return this.http.put<CreatePostResponse>(url, content).pipe(delay(500));
  }

  deletePost(id: number): Observable<string> {
    const url = `${this.baseURL}/${id}`;

    return this.http.delete<string>(url);
  }
}
