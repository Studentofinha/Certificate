import { PostListComponent } from "./post-list.component";
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from "@angular/core";
import {async,ComponentFixture,TestBed} from '@angular/core/testing'
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { HttpClientModule } from "@angular/common/http";

describe('PostListComponent',()=>{

  let component:PostListComponent;
  let fixture:ComponentFixture<PostListComponent>
  let debugElement:DebugElement

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations:[PostListComponent]
    }).compileComponents();
  })
  beforeEach(()=>{
fixture=TestBed.createComponent(PostListComponent)
component=fixture.componentInstance;

  })
  it(`should have as a 'primary'`, () => {
    const fixture = TestBed.createComponent(PostListComponent);
    const link = fixture.debugElement.nativeElement.querySelector('a mat-button');

    expect(link).toBeNull();
  });
})
