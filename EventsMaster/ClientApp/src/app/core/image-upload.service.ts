import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Image {
  name: string;
  uri: string;
  size: string;
}

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(selectedFile: File): Observable<Image> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post<Image>('https://eventsmasterapi.azurewebsites.net//upload/image', fd);
  }
}
