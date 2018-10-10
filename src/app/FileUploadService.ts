/**
 * Created by matjazhi on 7.8.2017.
 */
import {EhrUploadService, FileUploadStatus} from "./EhrUploadService";
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class FileUploadService implements EhrUploadService {

  uploadUrl: string="https://rest.ehrscape.com/store/rest";

  constructor(private http:Http) {
  }

  uploadFiles(fileList: FileList, uploadUrl?: string): Observable<FileUploadStatus[]> {

    if (fileList.length > 0) {
      let formData: FormData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        let file: File = fileList[i];
        formData.append("file", file, file.name);
        formData.append('mimeType', file.type);
        formData.append('fileName', file.name);
      }
      if (formData.has('file')) {
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.post(uploadUrl || this.uploadUrl, formData, options)
          .map((res) => {
            let resVal: any = res.json();
            let fus: FileUploadStatus = {fileUrl: resVal.href, fileMimeType: resVal.mimeType, success: true};
            return [fus];
          })
          .catch(error => Observable.throw(error));
      }
    }
  }

  uploadedFileRemoved(fileUri:string){
    console.log("FileUploadService delete from store uri=",fileUri)
  }
}
