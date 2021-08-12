import { Injectable } from '@angular/core';
import { Post } from '../post.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { createBrotliCompress } from 'zlib';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              courseName: post.courseName,
              startDate: post.startDate,
              comment:post.comment,
              endDate: post.endDate,

            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        console.log(transformedPosts);

        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      courseName: string;
      startDate: string;
      comment:string,
      endDate: string;

    }>('http://localhost:3000/api/posts/' + id);
  }

  addPosts(
    title: string,
    content: string,
    courseName: string,
    startDate: string,
    comment:string,
    endDate: string,

  ) {
    const post: Post = {
      id: null,
      isDeleted:true,
      title: title,
      content: content,
      comment:comment,
      courseName: courseName,
      startDate: startDate,
      endDate: endDate,
    };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(
    id: string,
    title: string,
    content: string,
    courseName: string,
    comment:string,
    startDate: string,
    endDate: string
  ) {
    const post: Post = {
      id: id,
      isDeleted:true,
      title: title,
      content: content,
      comment:comment,
      courseName: courseName,
      startDate: startDate,
      endDate: endDate,
    };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        console.log(response);

        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .patch('http://localhost:3000/api/posts/' + postId,{isDeleted:true})
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
