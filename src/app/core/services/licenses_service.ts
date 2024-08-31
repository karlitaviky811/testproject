import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../enviorement";
import { ENDPOINT } from "../constants/endpoints";
import { Observable, map } from "rxjs";
import { License } from "../interfaces/license";

@Injectable()
export class LicenseService {
    private readonly http = inject(HttpClient);

    /**
     * método para obtener todas las licencias
     * @param credentials: credenciales para inicio de sesión
     */
    public getLicenses(): Observable<License[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.licenses}?page=1&limit=10`).pipe(map(res => res.data));
    }

     /**
     * método para obtener licencias del robot
     * @param credentials: credenciales para inicio de sesión
     */
     public getLicensesByRobotId(robotId: number): Observable<License[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.licenses_by_robot}/${robotId}?page=1&limit=10`).pipe(map(res => res.data));
    }
}