import { Injectable } from '@angular/core';
import {catchError, Observable, retry, throwError} from "rxjs";
import {Offer} from "./offer";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://studentsupport.s1910456023.student.kwmhgb.at/api/users"

  constructor(
    private http: HttpClient
  ) {
  }

  // get user by userID
  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
