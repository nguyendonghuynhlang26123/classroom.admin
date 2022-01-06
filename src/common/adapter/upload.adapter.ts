import { repository } from 'services/repository';
export class MyUploadAdapter {
  public loader: any;

  constructor(loader: any) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    // Update the loader's progress.
    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file.then((uploadedFile: any) => {
      return new Promise(async (resolve, reject) => {
        const data: any = new FormData();
        data.append('image', uploadedFile);
        const response = await repository.post(`/upload`, data);
        if (response) {
          resolve(response);
        } else {
          reject(`Couldn't upload file: ${uploadedFile.name}.`);
        }
      });
    });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    // server.abortUpload();
  }
}
