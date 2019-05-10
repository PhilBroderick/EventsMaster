import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(selectedFile: File) {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post('https://eventsmasterapi.azurewebsites.net//upload/image', fd);
  }
}
