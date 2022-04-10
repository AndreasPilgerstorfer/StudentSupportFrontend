import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/course";

@Component({
  selector: 'lva-overview',
  templateUrl: './lva-overview.component.html',
  styleUrls: [
    "lva-overview.component.scss"
  ]
})
export class LvaOverviewComponent implements OnInit {

  public title = "LVA Übersicht";
  public courses: Course[] = [];

  constructor(
    private cs: CourseService
  ) {
  }

  ngOnInit(): void {
    this.cs.getAll().subscribe(res => {
      this.courses = res;
    });
  }
}
