import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Strategy } from "../interfaces/strategy";
import { ENDPOINT } from "../constants/endpoints";
import { environment } from "../../../enviorement";

@Injectable()
export class StrategyService {
    private readonly http = inject(HttpClient);

    /**
     * método para obtener todas las estrategías
     */
    public getStrategies(): Observable<Strategy[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.strategy}?page=1&limit=10`).pipe(map(res => res.data));
    }

    /**
     * método para obtener las estrategías por robotId
     * @param robotId: id del robot
     */
    public getStrategiesByRobotId(robotId: number): Observable<Strategy[]> {
        return this.http
            .get<any>(`${environment.apiUrl}${ENDPOINT.strategy_by_robot}/${robotId}?page=1&limit=10`).pipe(map(res => res.data));
    }
}