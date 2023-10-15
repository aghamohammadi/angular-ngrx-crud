import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '@app/shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`)
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post.id}`, post)
  }
}
