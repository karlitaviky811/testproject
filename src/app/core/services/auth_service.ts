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
                this.setToken(response)
                this.setDataUser(response)
            }
        })
    );

    return loginRequest;
  }


  private setToken(data: any) : void{
    localStorage.setItem(this.tokenKey, data.token);
  } 

  private setDataUser(data: any) : void{
    localStorage.setItem('user', data.user.name + ' ' + data.user.lastName);
  } 

  isTokenExpired(token: any) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);

  }

  getDataUser() : string | null {
    return localStorage.getItem('user');

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
    localStorage.removeItem('user');
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/sign-in']);
  }

  register(credentials: any){
    const registerRequest = this.http.post<any>(`${environment.apiUrl}${ENDPOINT.register}`, credentials).pipe(
      tap(response=>{
          if(response.token){
              this.setToken(response)
              this.setDataUser(response)
          }
      })
  );
    return registerRequest;
  }

  validRecaptcha(token: string){
    const registerRequest = this.http.get<any>(`${environment.apiUrl}${ENDPOINT.validateRecaptcha}?token=${token}`,).pipe(
      tap(response=>{
      })
  );
    return registerRequest;
  }


  
  validRecaptchaServer(token: string){
    var secret = '6LcKPjQqAAAAAF3qIfR1FZafei7YUVnqp19cWN06'
   var obj: any = {
      // PENDIENTE: Reemplaza el token y las variables de acción de reCAPTCHA antes de ejecutar la muestra.
      "projectID" : "fwa-project-1724197064076",
      "recaptchaKey" : "6LcKPjQqAAAAAL2kpt1WlZiXGv01bwvTnFmstpR1",
      "token" : "action-token",
      "recaptchaAction" : "action-name"
    }
    const registerRequest = this.http.get<any>(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, obj).pipe(
      tap(response=>{
      })
  );
    return registerRequest;
  }
}
