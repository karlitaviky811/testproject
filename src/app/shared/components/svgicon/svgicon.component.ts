import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'fwa-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svgicon.component.html',
  styleUrl: './svgicon.component.scss'
})
export class SvgIconComponent implements OnInit {
  @Input() iconName: string = '';
  @Input() iconSize = '24px';
  @Input() iconColor = 'black';

  constructor(private http: HttpClient, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
      this.loadIcon();
  }

  private loadIcon(): void {
      const iconPath = `testproject/src/assets/img/${this.iconName}.svg`;

      this.http
          .get(iconPath, { responseType: 'text' })
          .pipe(
              tap((svgText) => {
                  const svgElement = this.renderer.createElement('span');
                  svgElement.innerHTML = svgText;
                  const icon = svgElement.querySelector('svg');
                  this.applyIconStyles(icon);
                  this.elementRef.nativeElement.appendChild(icon);
              }),
              catchError((error: any) => {
                  console.error(`Failed to load SVG icon '${this.iconName}':`, error);
                  return of(null);
              })
          )
          .subscribe();
  }

  private applyIconStyles(svgElement: HTMLElement): void {
      this.renderer.setStyle(svgElement, 'width', this.iconSize);
      this.renderer.setStyle(svgElement, 'height', this.iconSize);
      this.renderer.setStyle(svgElement, 'fill', this.iconColor);
  }
}
