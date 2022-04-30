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

  //get all open Offers
  getAllOpenOffers(courseId: number): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/findByCourseIDOpen/${courseId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // get offer by offerID
  getSingleOffer(id: String): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/findByOfferID/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // get all offer by userID student
  findByAssociatedStudent(id: any): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/findByUserIDStudent/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // get all offer by userID student
  findByTeacherId(id: any): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/findByUserIDTeacher/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //update Offer
  updateOffer(id: any, requestBody: any) {
    return this.http.put(`${this.api}/${id}`, requestBody)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //create Offer
  create(offer: any): Observable<any> {
    return this.http.post(`${this.api}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // Delete Offer
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
