import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'fwa-panel-filters',
  templateUrl: './panel-filters.component.html',
  styleUrl: './panel-filters.component.scss'
})
export class PanelFiltersComponent implements AfterViewInit {

  value: string | undefined;
  @ViewChild('toggleablePanel') toggleablePanel:Panel | undefined;

  ngAfterViewInit(): void {
    this.toggleablePanel!.collapseIcon = 'pi pi-sort-up-fill';
    this.toggleablePanel!.expandIcon = 'pi pi-sort-down-fill';
  }
}
