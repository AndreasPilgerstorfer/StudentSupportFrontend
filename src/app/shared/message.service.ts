import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private api = "http://studentsupport.s1910456023.student.kwmhgb.at/api/messages"

  constructor(
    private http: HttpClient
  ) {
  }

  // Create New Message (POST)
  create(message: any): Observable<any> {
    return this.http.post(`${this.api}`, message).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // Deletes one message
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Get All Messages for a Teacher ID
  getByTeacherId(id: number) {
    return this.http.get<Message>(`${this.api}/findByTeacherID/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error
  errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }
}
