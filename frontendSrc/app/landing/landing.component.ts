import { Component, Inject, HostListener, ViewChild, OnInit } from '@angular/core';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from "@angular/platform-browser";
import { NgForm } from '@angular/forms';
import { VideosService } from "../services/videos.service";
import { Video } from "../model/video";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  width = 0;

  videos:Video[];

  constructor(private videosService: VideosService, private router: Router) { }

  ngOnInit(){
    this.videosService.list().then(videos=>{
      this.videos = videos;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

}