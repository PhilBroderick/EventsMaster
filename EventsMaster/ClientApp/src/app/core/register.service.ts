import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as $ from 'jquery';

@Injectable()
export class RegisterService {

  invalidUsername: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  register(form: NgForm) {

    //check if passwords match, return if false
    if (form.value.password !== form.value.confirmPassword) {
      console.log("passwords don't match")
      console.log(form.value.password)
      console.log(form.value.confirmPassword)
      return;
    } else {

      let credentials = JSON.stringify(form.value);
      console.log(credentials);

      this.http.post("https://eventsmasterapi.azurewebsites.net/auth/checkusername", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(response => {
        console.log("success")
        $('input').css("border", "");
      }, err => {
        console.log("error")
        $('input').css("border", "2px solid red");
        this.invalidUsername = true;
      });
    }
  }

  checkUsername(username: string) {
    
    let usernameJson = {
      "username": username
    }

    this.http.post("https://eventsmasterapi.azurewebsites.net/auth/checkusername", usernameJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log("checkedUsername")
      $('#username').css("border", "2px solid green");
    }, err => {
      console.log("error")
      $('#username').css("border", "2px solid red");
      this.invalidUsername = true;
    });
  }
}
