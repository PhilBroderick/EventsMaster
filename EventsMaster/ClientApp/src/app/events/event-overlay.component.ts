import { Component, Input, Inject, HostListener} from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, group, query } from '@angular/animations';

import { EVENT_DIALOG_DATA } from "./event-overlay.tokens";
import { EventOverlayRef } from './event-overlay-ref';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../core/login.service';
import { EventService } from '../core/event.service';
import { UploadService } from '../core/image-upload.service';
import { Event } from '../shared/models/event.model';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const ESCAPE = 27;

@Component({
  selector: 'event-overlay',
  templateUrl: './event-overlay.component.html',
  styleUrls: ['./event-overlay.component.css']
})

export class EventOverlayComponent {

  selectedFile = null;

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: EventOverlayRef,
    public loginService: LoginService,
    private eventService: EventService,
    private uploadService: UploadService,
    @Inject(EVENT_DIALOG_DATA) public event: any) { }
  
  updateEvent(event: Event) {
    if (this.selectedFile !== null) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(res => {
        let imageUri = res.uri;
        event.imageUrl = imageUri;
        console.log(event.imageUrl);
        this.eventService.updateEvent(event).subscribe(event => {
          this.dialogRef.close();
        });
      })
    } else {
      this.eventService.updateEvent(event).subscribe(event => {
        this.dialogRef.close();
      })
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
