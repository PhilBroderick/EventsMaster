import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    this.http.get("https://localhost:44315/api/values", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.forecasts = response;
    }, err => {
      console.log(err)
    });
  }
}

