import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { create } from "domain";
import { PostsService } from '../post-list/posts.service';
import { Post } from '../post.module';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            isDeleted:false,
            title: postData.title,
            content: postData.content,
            comment: postData.comment,
            courseName: postData.courseName,
            endDate: postData.endDate,
            startDate: postData.startDate,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postsService.addPosts(
        form.value.title,
        form.value.content,
        form.value.courseName,
        form.value.comment,
        form.value.startDate,
        form.value.endDate,
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content,
        form.value.courseName,
        form.value.comment,
        form.value.endDate,
        form.value.startDate
      );
    }

    form.resetForm();
  }
}
