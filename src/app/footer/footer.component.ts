import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
