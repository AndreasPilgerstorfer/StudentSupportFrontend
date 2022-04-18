import {Course} from "./course";

export class CourseFactory {

  static empty():Course {
    return new Course(0, "", "", "",
      {id:0,url:"", title:""});
  }

}
