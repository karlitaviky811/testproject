import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LicenseService {
    constructor(private http: HttpClient){

    }
    /**
     * método para iniciar sesión
     * @param credentials: credenciales para inicio de sesión
     */
    public getData() {
    
        const url = `http://localhost:3000/license`;
        const getData = this.http
            .get<any>(url)

        return getData;
    }
}