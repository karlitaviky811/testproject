import { inject, Injectable, signal } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient } from "@angular/common/http";
import { ENDPOINT } from "../constants/endpoints";
import { environment } from "../../../enviorement";


@Injectable()
export class UsersService {

    admin = signal<string>('LOGIN')
    constructor(private http: HttpClient){

    }
    /**
     * método para iniciar sesión
     * @param credentials: credenciales para inicio de sesión
     */
    public getData() {
    
        const url = `${environment.apiUrl}${ENDPOINT.users}`;
        const getData = this.http
            .get<any>(url)

        return getData;
    }
    public updatePassword(obj : any){
        const url = `${environment.apiUrl}${ENDPOINT.users_password}`;

        const putData = this.http.put<any>(url,obj);

        return putData;
    }

    reset(){
        this.admin.set('LOGIN')
    }

    updateLoginUser(data: any){
        this.admin.set(data)
    }
}