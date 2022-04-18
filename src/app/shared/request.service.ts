import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

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

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
