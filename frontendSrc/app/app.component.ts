import { Component,AfterViewInit,ViewContainerRef,PipeTransform ,Pipe} from '@angular/core';
import {UsersService} from './services/users.service';
import {User} from './model/user';
import {Router,NavigationEnd} from "@angular/router";

@Component({
 selector: 'app-root',
  styleUrls: ['./app.component.less'],
  template: '<app-nav></app-nav><router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private usersService : UsersService, private router: Router,private viewContainerRef:ViewContainerRef){
  }

  ngAfterViewInit(){
    var id = this.usersService.getSavedUserId();
    if(id){
      this.usersService.getUser(id).then(result=>{
        this.usersService.setAppUser(result);
      }).catch(err=>{
        this.router.navigate(["/"]);
      });
    }else{
      setTimeout(()=>{
        this.router.navigate(["/"]);
      },0);
    }
    
    
  }
}