import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class LoginInterceptorService implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) {
  }

  // Fehler Abfangen
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event:HttpEvent<any>)=>{}, (err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401) {
          this.toastr.error("Incorrect credentials","Login error");
        }
      }
    }));
  }

}
