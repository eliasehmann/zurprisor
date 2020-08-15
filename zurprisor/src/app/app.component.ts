import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
    //called first time before the ngOnInit()
  }

  title = 'zurprisor';

  public originalCountDownConfig =
    {
      //"stopTime": 1598106240,
      "stopTime": 1597322271,
      //"format": 'dd:HH:mm',
    };

  public countDownIsVisible: boolean;

  public fileIsVideo: boolean;
  public fileSource: string;
  public fileComment: string;

  async ngOnInit() {
    this.countDownIsVisible = true;

    var ts = Math.round((new Date()).getTime() / 1000);

    if (this.originalCountDownConfig.stopTime - ts < 0) {
      this.countDownIsVisible = false;
      await this.loadRandomFile();

    }

  }

  private async getRandomFilePath(): Promise<[string, string, string]> {
    const resultFiles = await this.http.get('assets/files/txt/files.txt', { responseType: 'text' }).toPromise();
    const resultComments = await this.http.get('assets/files/txt/files_comments.txt', { responseType: 'text' }).toPromise();

    var files: string[] = resultFiles.split("\n");
    var comments: string[] = resultComments.split("\n")

    const random = Math.floor(Math.random() * files.length);
    var file: string = files[random];

    var comment = "";
    console.log(file);

    for (var index in comments) {
      console.log(comments[index]);

      if (comments[index].includes(file.split(".")[0])) {
        comment = comments[index].split('|')[1];
      }

    }

    if (file.includes("mp4")) {
      console.log("Video");
      return ["video", file, comment];
    }
    if (file.includes("jpg") || file.includes("JPG") || file.includes("jpeg")) {
      console.log("Image");
      return ["image", file, comment];
    }





  }

  private async loadRandomFile() {
    var fileToLoad = await this.getRandomFilePath();


    this.fileSource = "assets/files/" + fileToLoad[1];
    this.fileComment = fileToLoad[2];

    if (fileToLoad[0] === "video") {
      this.fileIsVideo = true;
    }
    else {
      this.fileIsVideo = false;
    }
  }
  //dir /b > files.txt 


}



