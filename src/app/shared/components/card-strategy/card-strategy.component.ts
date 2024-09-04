import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fwa-card-strategy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-strategy.component.html',
  styleUrl: './card-strategy.component.scss',
})
export class CardStrategyComponent implements OnInit {
  @Input() data!: any;
  selectedStrategies : any = [];
  ngOnInit(): void {
    console.log('data', this.data);
  }

  getBorderColor(strategy: any) {
    return strategy.selected == false ? 'border-grey' : 'border-yellow-500';
  }

  selected(itemStrategies: any){
    itemStrategies.shoppingItem = !itemStrategies.shoppingItem

  }

  shoppingItem(strategy: any){
    return strategy.shoppingItem == false ? 'border-grey'  : 'border-primary';  
  }
}
