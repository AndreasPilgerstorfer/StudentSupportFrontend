import {Component, Input} from '@angular/core';

@Component({
  selector: 'studSup-heading',
  templateUrl: './heading.component.html',
  styleUrls: [
    "./heading.component.scss"
  ]
})
export class HeadingComponent {

  @Input() public title: string | undefined;

  constructor() {
  }
}
