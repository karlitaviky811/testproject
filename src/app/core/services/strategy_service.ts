import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Strategy } from "../interfaces/strategy";
import { ENDPOINT } from "../constants/endpoints";
import { environment } from "../../../enviorement";

@Injectable()
export class StrategyService {
    constructor(private http: HttpClient){

    }
    /**
     * método para iniciar sesión
     * @param credentials: credenciales para inicio de sesión
     */
    public getLicenses(): Observable<Strategy[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.strategy}?page=1&limit=10`).pipe(map(res => res.data));
    }
}