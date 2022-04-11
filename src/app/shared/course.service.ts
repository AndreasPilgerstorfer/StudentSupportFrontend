import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Course} from "./course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private api = "http://studentsupport.s1910456023.student.kwmhgb.at/api"

  constructor(
    private http: HttpClient
  ) {
  }

  //get all courses
  getAll(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(`${this.api}/courses`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //get one course
  getSingle(id: String): Observable<Course> {
    return this.http.get<Course>(`${this.api}/courses/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
