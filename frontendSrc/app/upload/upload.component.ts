import { Component, OnInit } from '@angular/core';
import {VideosService} from "../services/videos.service";
import {Video} from "../model/video";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
  name:String;
  thumbnailFile:File;
  videoFile:File;

  uploading = false;

  constructor(private videosService:VideosService,private router: Router) { }

  ngOnInit() {
  }

  upload(){
    var data = new Video({name:this.name}).toFormData();
    data.append("thumbnail",this.thumbnailFile);
    data.append("video",this.videoFile);
    this.uploading = true;
    this.videosService.upload(data).then((video)=>{
      this.router.navigate(["/"]);
    }).catch(err=>{
      alert(err);
      this.uploading = false;
    })
  }

}
