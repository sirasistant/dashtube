import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subscription } from "rxjs/Subscription";
import { User } from "../model/user"
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  appUserSubscription: Subscription;

  alias: String;
  password: String;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    var appUser = this.usersService.appUserSubject.getValue();
    if (appUser)
      this.router.navigate(["/"]);
    this.appUserSubscription = this.usersService.appUserSubject.subscribe(appUser => {
      if (appUser)
        this.router.navigate(["/"]);
    })
  }

  login() {
    this.usersService.login(new User({ alias: this.alias, password: this.password.trim() })).then((user: User) => {
      this.usersService.setAppUser(user);
    }).catch((err: any) => {
      console.log(err.toString());
      alert(err._body);
    });
  }

}
