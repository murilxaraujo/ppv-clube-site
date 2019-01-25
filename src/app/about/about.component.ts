import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  viewportHeight = "";
  viewportWidth = "";

  constructor() {

  }

  ngOnInit() {
    this.viewportHeight = "height:" + document.documentElement.clientHeight+"px;";
    this.viewportWidth = "width:" + document.documentElement.clientWidth+"px;";

    this.setup();
  }

  setup() {
    if (document.documentElement.clientWidth < 800) {
      document.getElementById('content').setAttribute('style', "height: " + (document.documentElement.clientHeight/2) +"px;");
      document.getElementById('image').setAttribute('style', "height: " + (document.documentElement.clientHeight/2) +"px;");
    } else {
      document.getElementById('content').setAttribute('style', "height: " + (document.documentElement.clientHeight-65) +"px;");
      document.getElementById('image').setAttribute('style', "height: " + (document.documentElement.clientHeight-65) +"px;");
      document.getElementById('subcontent').setAttribute('style', "height: " + (document.documentElement.clientHeight-65) +"px;");
    }
  }

}
