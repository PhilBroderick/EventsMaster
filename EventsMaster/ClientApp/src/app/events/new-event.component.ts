import { Component } from '@angular/core';
import * as $ from 'jquery';
import { UploadService } from '../core/image-upload.service';
import { NgForm } from '@angular/forms';
import { EventService } from '../core/event.service';
import { Event } from '../shared/models/event.model';
import { LoginService } from '../core/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html'
})

export class NewEventComponent {

  selectedFile = null;
  event: Event

  constructor(private uploadService: UploadService, private eventService: EventService, private loginService: LoginService, private router: Router) { }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  createEvent(form: NgForm) {
    this.event = new Event();
    this.uploadService.uploadFile(this.selectedFile)
      .subscribe(res => {
        let imageUri = res.uri;
        this.event.name = form.value['name'];
        this.event.description = form.value['description'];
        this.event.category = form.value['category'];
        this.event.tickets = form.value['tickets'];
        this.event.imageUrl = imageUri;
        this.event.userId = this.loginService.currentUserId;
        this.eventService.createEvent(this.event)
          .subscribe(res => {
            this.router.navigate(['/']);
          })
      })
  }
}
