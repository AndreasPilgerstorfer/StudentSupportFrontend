import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = "http://studentsupport.s1910456023.student.kwmhgb.at/api/requests"

  constructor(
    private http: HttpClient
  ) { }

  // Create New Request
  create(request: any): Observable<any> {
    return this.http.post(`${this.api}`, request).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // Get Requests by Teacher ID
  getPendingByTeacherId(id: number) {
    return this.http.get<Array<Request>>(`${this.api}/getPendingTeacher/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //update Request
  updateRequest(id: any, requestBody: any) {
    return this.http.put(`${this.api}/${id}`, requestBody)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
