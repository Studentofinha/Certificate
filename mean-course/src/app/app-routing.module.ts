import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuhtGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostGetComponent } from './posts/post-get/post-get.component';

const routes: Routes = [

  {path:'',component:PostListComponent},
  {path:'create',component:PostCreateComponent,canActivate:[AuhtGuard]},
  {path:'edit/:postId',component:PostCreateComponent,canActivate:[AuhtGuard]},
  {path:'certificate/:postId',component: PostGetComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuhtGuard]
})
export class AppRoutingModule { }
