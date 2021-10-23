import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { UserService } from "../Services/user.service";

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Interceptor pozvan")
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.UserService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          authorization: `${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}