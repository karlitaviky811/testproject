import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable()
export class AuthService {
    private LONGIN_URL = 'http://localhost:3000/auth/login';
    private REGISTER_URL = 'http://localhost:3000/auth/register';
    private tokenKey = 'auth';
  constructor(private http: HttpClient, private router: Router) {}

  public login(credentials: any): Observable<Auth> {
   
    const loginRequest = this.http.post<any>(this.LONGIN_URL,credentials).pipe(
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
    const registerRequest = this.http.post<any>(this.REGISTER_URL,credentials).pipe(
        tap(response=>{
            if(response.token){
                this.setToken(response.token)
            }
        })
    );

    return registerRequest;
  }
}
