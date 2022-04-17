import {Injectable} from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Offer} from "./offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private api = "http://studentsupport.s1910456023.student.kwmhgb.at/api/offers"

  constructor(
    private http: HttpClient
  ) {
  }

  //get all courses
  getAllOpenCourses(courseId: number): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/findByCourseIDOpen/${courseId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
