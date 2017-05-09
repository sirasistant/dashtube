import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UsersService {
  appUserSubject = new BehaviorSubject<User>(null);

  constructor(private _http: Http) { }


  login(user: User): Promise<User> {
    return this._http.post("/api/users/login", user)
      .map(res => {
        return new User(res.json());
      }).toPromise();
  }

  getSavedUserId() {
    return localStorage.getItem("UserId");
  }

  getUser(id: String): Promise<User> {
    return this._http.get("/api/users/" + id).map(res => {
      return new User(res.json());
    }).toPromise();
  }

  getUsers(): Promise<User[]> {
    return this._http.get("/api/users").map((res) => {
      return res.json().map((json: any) => new User(json));
    }).toPromise();
  }

  setAppUser(user: User) {
    if (user && user._id) {
      localStorage.setItem("UserId", user._id.toString());
    } else {
      localStorage.setItem("UserId", null);
    }
    this.appUserSubject.next(user);
  }


  createUser(user: any): Promise<User> {
    return this._http.post("/api/users/register", user)
      .map(res => {
        return new User(res.json());
      }).toPromise();
  }

  updateUser(id: String, user: any): Promise<void> {
    return this._http.post("/api/users/" + id, user)
      .map(res => {
        return null;
      }).toPromise();
  }


  deleteUser(user: User): Promise<void> {
    return this._http.post("/api/users/" + user._id + "/delete", user)
      .map(res => {
        return null;
      }).toPromise();
  }

  changePass(user: User, oldPass: String, newPass: String): Promise<void> {
    return this._http.post("/api/users/" + user._id + "/changepassword", {
      oldPassword: oldPass,
      password: newPass
    }).map(res => {
      return null;
    }).toPromise();
  }

  restorePass(username:String,email:String):Promise<void>{
    return this._http.post("/api/users/restorepassword", {
      alias:username,
      email:email
    }).map(res => {
      return null;
    }).toPromise();
  }

}