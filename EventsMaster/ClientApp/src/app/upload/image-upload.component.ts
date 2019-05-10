import { Component } from "@angular/core";
import * as $ from 'jquery';
import { UploadService } from "../core/image-upload.service";

@Component({
  selector: 'app-image',
  templateUrl: './upload-image.component.html'
})

export class ImageUploadComponent {

  selectedFile: File = null;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.uploadService.uploadFile(this.selectedFile)
      .subscribe(res => {
        let uri = res.uri;
        $('#imageUpload').attr({ "src": uri });
      })
  }
}
