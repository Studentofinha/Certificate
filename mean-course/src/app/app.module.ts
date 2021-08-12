import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatPaginatorModule} from '@angular/material/paginator';

import{MatDialogModule} from '@angular/material/dialog'
import { AppComponent } from './app.component';
import{PostCreateComponent} from './posts/post-create/post-create.component';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component'
import { PostsService } from './posts/post-list/posts.service';
import { LoginComponent } from './auth/login/login.component';
import {SignUpComponent} from './auth/signup/signup.component'
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
//import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { PostGetComponent } from './posts/post-get/post-get.component';

@NgModule({
  declarations: [
    PostCreateComponent,
    AppComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent,
    ErrorComponent,
    PostGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    PostsService,
    AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    //{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
