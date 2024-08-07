import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { License } from "../interfaces/license";
import { environment } from "../../../enviorement";
import { ENDPOINT } from "../constants/endpoints";
import { Robot } from "../interfaces/robot";

@Injectable()
export class RobotService {
    constructor(private http: HttpClient){

    }
    /**
     * método para iniciar sesión
     * @param credentials: credenciales para inicio de sesión
     */
    public getRobots(): Observable<Robot[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.robots}?page=1&limit=10`).pipe(map(res => res.data));
    }
}
