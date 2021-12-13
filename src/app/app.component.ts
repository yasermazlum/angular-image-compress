import { Component } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;

  constructor(private imgCompressService: ImageCompressService) {

  }
  onChange(fileInput: any) {
    //let fileList: FileList;
    console.warn(fileInput)
    let images1: Array<IImage> = [];

    ImageCompressService.filesToCompressedImageSource(fileInput.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
        images1.push(image);
        this.processedImages = images1;
        this.showTitle = true;
      }, (error) => {
        console.log("Error while converting");
      });
    });

    // or you can pass File[] 
    let images2: Array<IImage> = [];
    let files: File[] = Array.from(fileInput.target.files);

    ImageCompressService.filesArrayToCompressedImageSource(files).then(observableImages => {
      observableImages.subscribe((image) => {
        images2.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
        this.processedImages = images2;
        this.showTitle = true;
      });
    });


  }

}