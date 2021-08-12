import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { NgForm } from '@angular/forms';
import { Post } from '../post.module';
import { PostsService } from '../post-list/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-get',
  templateUrl:'./post-get.component.html',
  styleUrls: ['./post-get.component.css'],
})
export class PostGetComponent implements OnInit {
  post: Post;
  private postId: string;

  constructor(
    public postsService:PostsService,
    public route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');

        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            isDeleted:false,
            title: postData.title,
            comment:postData.comment,
            content: postData.content,
            courseName: postData.courseName,
            endDate: postData.endDate,
            startDate: postData.startDate,
          };
        });
      }
    });
  }
  public convetToPDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Certificate.pdf'); // Generated PDF
    });
  }
}
