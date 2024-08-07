import {
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth_service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = ( 
    request: HttpRequest<any>,
    next: HttpHandlerFn
) : Observable<HttpEvent<unknown>>=>{
    console.log('request', request.url)

    const authSrv = inject(AuthService)
    const token = authSrv.getToken()

    if(token){
       request = request.clone({
        setHeaders :{
            'X-Access-Token' : token
        }
       })
    }
    return next(request);
   
}