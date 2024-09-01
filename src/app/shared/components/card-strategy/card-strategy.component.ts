import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fwa-card-strategy',
  standalone: true,
  imports: [],
  templateUrl: './card-strategy.component.html',
  styleUrl: './card-strategy.component.scss'
})
export class CardStrategyComponent implements OnInit {
  @Input() data!: any;

  ngOnInit(): void {
    console.log('data', this.data) 
  }
  
}
