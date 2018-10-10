import {Observable} from "rxjs/Observable";

export interface EhrUploadService {
  uploadFiles:UploadFilesFn;
  uploadedFileRemoved:UploadedFileRemovedFn;
}

export interface FileUploadStatus{
  success:boolean;
  file?:File;
  message?:string;
  fileUrl:string;
  fileMimeType?:string;
}

export interface UploadFilesFn {
  (fileList:FileList, uploadUrl?:string):Observable<FileUploadStatus[]>;
}

export interface UploadedFileRemovedFn {
  (fileUri:string):void;
}

export class FileUploadServicePlaceholder implements EhrUploadService{
  uploadFiles (fileList: FileList, uploadUrlParam?: string): Observable<FileUploadStatus[]> {
    return null;
  }
  uploadedFileRemoved (uri: string): void {

  }
}
