import { Injectable } from '@angular/core';
import { Video } from "../model/video";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";

@Injectable()
export class VideosService {

  constructor(private http: Http) { }

  upload(video: any): Promise<Video> {
    return this.http.post("/api/videos", video).map(res => new Video(res.json())).toPromise();
  }

  list(): Promise<Video[]> {
    return this.http.get("/api/videos").map(res => {
      return res.json().map(elem => new Video(elem))
    }).toPromise();
  }


}
