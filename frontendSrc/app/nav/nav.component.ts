import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { ScrollSpyModule, ScrollSpyService } from 'ng2-scrollspy';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { User } from "../model/user"
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  navScroll = 0;
  width = 0;
  appUserSubscription: Subscription;
  appUser: User;

  constructor(private scrollSpyService: ScrollSpyService, private pageScrollService: PageScrollService, private router: Router, private usersService: UsersService) {
    this.width = window.innerWidth;
  }

  ngAfterViewInit() {
    this.scrollSpyService.getObservable('window').subscribe((e: any) => {
      this.navScroll = e.currentTarget.scrollY;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit() {
    this.appUser = this.usersService.appUserSubject.getValue();
    this.appUserSubscription = this.usersService.appUserSubject.subscribe(appUser => {
      this.appUser = appUser;
    })
  }
  home() {
    this.router.navigate(["/"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  register() {
    this.router.navigate(["/register"]);
  }

  upload() {
    this.router.navigate(["/upload"]);
  }
}
