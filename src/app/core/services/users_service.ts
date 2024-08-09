import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient } from "@angular/common/http";
import { ENDPOINT } from "../constants/endpoints";
import { environment } from "../../../enviorement";

@Injectable()
export class UsersService {
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
}