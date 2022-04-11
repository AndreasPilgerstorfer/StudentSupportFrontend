import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/course";
import {ActivatedRoute, Params} from "@angular/router";
import {CourseFactory} from "../../shared/course-factory";

@Component({
  selector: 'ss-lva-detail',
  templateUrl: './lva-detail.component.html',
  styleUrls: [
    "lva-detail.component.scss"
  ]
})
export class LvaDetailComponent implements OnInit {

  public course: Course = CourseFactory.empty();
  private params: Params;
  public title = "LVA Information";
  public subtitle = "Angebote";

  constructor(
    private cs: CourseService,
    private route: ActivatedRoute
  ) {
    this.params = this.route.snapshot.params;
  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.cs.getSingle(this.params['lva-id']).subscribe(course => this.course = course);
  }
}
