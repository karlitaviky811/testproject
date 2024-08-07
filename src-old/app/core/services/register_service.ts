import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable()
export class RegisterService {
    private LONGIN_URL = 'http://localhost:3000/auth/login';
    private tokenKey = 'auth';
  constructor(private http: HttpClient, private router: Router) {}

  public register(credentials: any): Observable<Auth> {
   
    const url = `http://localhost:3000/auth/login`;
    const loginRequest = this.http.post<any>(this.LONGIN_URL,credentials).pipe(
        tap(response=>{
            if(response.token){
                //this.setToken(response.token)
            }
        })
    );

    return loginRequest;
  }


}
