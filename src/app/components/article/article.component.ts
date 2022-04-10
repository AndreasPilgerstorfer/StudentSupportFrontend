import {Component, Input} from '@angular/core';

interface ArticleContent {
  alignment: string,
  headline: string,
  text: string,
  imageUrl: string,
  imageSize: string,
  mobileAlignment: string,
  ctaText: string
}

@Component({
  selector: 'studSup-article',
  templateUrl: './article.component.html',
  styleUrls: [
    "./article.component.scss"
  ]
})
export class ArticleComponent {

  @Input() public data: ArticleContent | undefined;

  constructor() {
  }
}
