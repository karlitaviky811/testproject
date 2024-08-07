import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { environment } from '../../../enviorement';
import { ENDPOINT } from '../constants/endpoints';


@Injectable()
export class AuthService {
  private readonly tokenKey = 'auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  public login(credentials: any): Observable<Auth> {
  
    const loginRequest = this.http.post<any>(`${environment.apiUrl}${ENDPOINT.sign_in}`, credentials).pipe(
        tap(response=>{
            if(response.token){
                this.setToken(response.token)
            }
        })
    );

    return loginRequest;
  }


  private setToken(token: string) : void{
    localStorage.setItem(this.tokenKey, token);
  } 


  public getToken() : string | null {
    return localStorage.getItem(this.tokenKey);

  }

  isAuthenticated(): boolean{
    const token = this.getToken()

    if(!token){
        return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }


  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/sign-in']);
  }

  register(credentials: any){
    const registerRequest = this.http.post<any>(`${environment.apiUrl}${ENDPOINT.register}`, credentials).pipe(
        tap(response=>{
            if(response.token){
                this.setToken(response.token)
            }
        })
    );

    return registerRequest;
  }
}
