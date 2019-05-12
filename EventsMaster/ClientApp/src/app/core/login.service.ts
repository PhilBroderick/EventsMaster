import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Injectable()
export class LoginService {

  invalidLogin = true;
  isLoggedIn = false;
  userId: string = null;

  constructor(private router: Router, private http: HttpClient) { }

  login(form: NgForm) {

    let credentials = JSON.stringify(form.value);
    
    this.http.post("https://eventsmasterapi.azurewebsites.net/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.isLoggedIn = true;
      this.http.post("https://eventsmasterapi.azurewebsites.net/auth/userid", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        })
      }).subscribe(res => {
        console.log(res);
        this.userId = (<any>res).userid;
        console.log(this.userId);
      })
    }, err => {
      this.invalidLogin = true;
    });
  }

  logout() {
    localStorage.removeItem("jwt");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
