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

  public cdTime =
    {
      //"stopTime": 1598106240,
      "stopTime": 1597322271,
      "format": 'dd:HH:mm',

    };

  public countDownIsVisible: boolean;

  public fileIsVideo: boolean;
  public fileSource: string;

  async ngOnInit() {
    this.countDownIsVisible = true;

    var ts = Math.round((new Date()).getTime() / 1000);

    if (this.cdTime.stopTime - ts < 0) {
      this.countDownIsVisible = false;
      await this.loadRandomFile();

    }

  }

  private async getRandomFilePath(): Promise<[string, string]> {
    const result = await this.http.get('assets/files/txt/files.txt', { responseType: 'text' }).toPromise();

    var files: string[] = result.split("\n");

    const random = Math.floor(Math.random() * files.length);
    console.log(files[random]);

    var file: string = files[random];

    if (file.includes("mp4")) {
      console.log("Video");
      return ["video", file];
    }
    if (file.includes("jpg") || file.includes("JPG")) {
      console.log("Image");
      return ["image", file];
    }



  }

  private async loadRandomFile() {
    var fileToLoad = await this.getRandomFilePath();


    this.fileSource = "assets/files/" + fileToLoad[1];

    if (fileToLoad[0] === "video") {
      this.fileIsVideo = true;
    }
    else {
      this.fileIsVideo = false;
    }
  }
  //dir /b > files.txt 


}



