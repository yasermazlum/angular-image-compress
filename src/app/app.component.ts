import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'app';
  selectedImage: any;
  processedImages: any;
  showTitle: boolean = false;

  loading: boolean = false;

  fileName: string = "";
  width: number = 0;
  height: number = 0;
  file: any = null;
  islem: boolean = false;

  constructor(private imgCompressService: ImageCompressService) {

  }

  onChange(fileInput: any) {
    this.loading=true;
    console.log(fileInput)
    this.file = fileInput.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(fileInput.target.files[0]);

    img.onload = () => {
      console.log("w: " + img.width + " | h: " + img.height)
      this.width = img.width;
      this.height = img.height;
      this.islem = true;
      if (this.file != null) this.compress(fileInput);
    };

  }

  compress(fileInput: any) {
    console.log("calisti")
    let images: Array<ImageData> = [];
    var option: ResizeOptions = { Resize_Max_Height: this.height, Resize_Max_Width: this.width, Resize_Quality: 50, Resize_Type: "" };

    ImageCompressService.filesToCompressedImageSourceEx(fileInput.target.files, option).then(observableImages => {
      observableImages.subscribe((image) => {
        let filename:string= image.fileName;
        let newData:ImageData={file:image, fileName:filename}

        images.push(newData);
        
        this.processedImages = images;
        this.showTitle = true;
        this.loading = false;
        console.log(this.processedImages)
      }, (error) => {
        console.log("Error while converting");
      });
    });
  }
}

export interface ImageData {
  file: IImage
  fileName: string
}