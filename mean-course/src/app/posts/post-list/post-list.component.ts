import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import {Subscription} from 'rxjs';
import { AuthService } from "src/app/auth/auth.service";
import {Post} from '../post.module';
import { PostsService} from "./posts.service";

@Component({
selector:'app-post-list',
templateUrl:'./post-list.component.html',
styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts=[
  //   {title:"First post",content:"This is the first post's content"},
  //   {title:"Second post",content:"This is the second post's content"},
  //   {title:"Third post",content:"This is the third post's content"},
  // ]
 posts: Post[]=[];
 totalPosts=10
 postsPerPage=2
 pageSizeOptions=[1,2,5,10]
 userId:string
 userIsAuthenticated=false
 private postsSub: Subscription;
 private authStatusSub: Subscription;

  constructor(public postsService:PostsService,private authService:AuthService){

 }
  ngOnInit(){
    console.log('Posts',  this.postsService.getPosts());

this.postsService.getPosts();
this.userId=this.authService.getUserId()
this.postsSub=this.postsService.getPostUpdateListener()

.subscribe((posts:Post[])=>{

  this.userId=this.authService.getUserId()
  this.posts=posts
});


}
onChangedPage(pageData:PageEvent){

}


onDelete(postId:string){
this.postsService.deletePost(postId);
}


ngOnDestroy(){
  this.postsSub.unsubscribe();
}

}
