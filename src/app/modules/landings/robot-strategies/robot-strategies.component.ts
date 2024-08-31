import { Component, inject, OnInit } from "@angular/core";
import { RobotStrategiesModule } from "./robot-strategies.module";
import { CardStrategyComponent } from "../../../shared/components/card-strategy/card-strategy.component";
import { PaginatorModule } from "primeng/paginator";
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { ActivatedRoute, Router } from "@angular/router";
import { StrategyService } from "../../../core/services/strategy_service";

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: "app-robot-strategies",
  standalone: true,
  imports: [
    RobotStrategiesModule,
    CardStrategyComponent,
    PaginatorModule,
    BannerComponent,
  ],
  providers: [StrategyService],
  templateUrl: "./robot-strategies.component.html",
  styleUrl: "./robot-strategies.component.scss",
})
export default class RobotStrategiesComponent implements OnInit {
  title = "ESTRATEGIAS DE ROBOT";
  first: number = 0;
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  strategySrv = inject(StrategyService);
  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnInit() {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    console.log("query", queryParams.get("id"));
    let id = Number(queryParams.get("id"));

    this.strategySrv.getStrategiesByRobotId(id).subscribe((res) => {
      console.log("res", res);
    });
  }
}
