import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";



@Component({
templateUrl:'./signup.component.html',
styleUrls:['./signup.component.css']

})
export class SignUpComponent implements OnInit, OnDestroy{

  private authStatusSub:Subscription

constructor(public authService:AuthService){}


  ngOnInit(){
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe()

  }

  onSignup(form:NgForm){
    console.log(form.value)
    if(form.invalid){
      return ;
    }
    else{
      this.authService.createUser(form.value.email,form.value.password)
    }

  }

ngOnDestroy(){
this.authStatusSub.unsubscribe()
}

}
