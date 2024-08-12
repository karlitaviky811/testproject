import { Component, EventEmitter, Output, WritableSignal, inject, signal } from '@angular/core';
import { StrategyService } from '../../../../../core/services/strategy_service';
import { Strategy } from '../../../../../core/interfaces/strategy';
import { PurchaseService } from '../../../../../core/services/purchase_service';

@Component({
  selector: 'app-step-two-strategies',
  templateUrl: './step-two-strategies.component.html',
  styleUrl: './step-two-strategies.component.scss'
})
export class StepTwoStrategiesComponent {
  @Output() nextCallback: EventEmitter<any> = new EventEmitter();
  @Output() prevCallback: EventEmitter<any> = new EventEmitter();

  private readonly strategyService = inject(StrategyService);
  readonly purchaseService = inject(PurchaseService);

  selectedStrategies: WritableSignal<Strategy[]> = signal<Strategy[]>([]);
  strategies = signal<Strategy[]>([]);

  ngOnInit(): void {
    this.strategyService.getLicenses()
      .subscribe({
        next: (res) => {
          this.strategies.set(res);
        }
      });
  }

  handleSelectStrategy(strategy: Strategy): void {
    const indexStrategy = this.selectedStrategies().findIndex(item => strategy.id == item.id);
    
    if (indexStrategy > -1) {
      this.selectedStrategies().splice(indexStrategy, 1)
    } else {
      if (this.purchaseService.selectedLicense != undefined && (this.purchaseService.selectedLicense().qtyStrategies > this.selectedStrategies().length)) {
        this.selectedStrategies().push(strategy)
      }
    }

    this.purchaseService.selectedStrategies = [...this.selectedStrategies()];
  }

  checkSelectedStrategy(strategy: Strategy): boolean {
    return this.selectedStrategies().filter(item => strategy.id == item.id).length > 0;
  }

  nextStep() {
    this.selectedStrategies().forEach(strategy => {
      // this.purchaseService.addItemToCart({
      //   id: 0,
      //   itemName: strategy.name,
      //   itemType: 'STRATEGY',
      //   itemElementId: strategy.id,
      //   itemPrice: 200.0,
      //   quantity: 1,
      //   totalPrice: 200.0,
      //   shoppingCartId: 1,
      // });
      this.purchaseService.cartItem().itemsExtra.push({
        itemName: strategy.name,
        itemType: 'STRATEGY',
        itemElementId: strategy.id,
        itemPrice: 200.0,
        quantity: 1,
        totalPrice: 200.0,
      });
    });
    
    this.nextCallback.emit();
  }

}
