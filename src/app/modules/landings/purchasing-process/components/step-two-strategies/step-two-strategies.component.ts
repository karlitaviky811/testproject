import { Component, EventEmitter, Output, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { StrategyService } from '../../../../../core/services/strategy_service';
import { Strategy } from '../../../../../core/interfaces/strategy';
import { PurchaseService } from '../../../../../core/services/purchase_service';
import { Message } from 'primeng/api';
import { Robot } from '../../../../../core/interfaces/robot';

@Component({
  selector: 'app-step-two-strategies',
  templateUrl: './step-two-strategies.component.html',
  styleUrl: './step-two-strategies.component.scss'
})
export class StepTwoStrategiesComponent {
  robot = input.required<WritableSignal<Robot>>();
  @Output() nextCallback: EventEmitter<any> = new EventEmitter();
  @Output() prevCallback: EventEmitter<any> = new EventEmitter();
  
  private readonly strategyService = inject(StrategyService);
  readonly purchaseService = inject(PurchaseService);
  messages: Message[] = [];
  qtyStrategies = 0;
  selectedStrategies: WritableSignal<Strategy[]> = signal<Strategy[]>([]);
  selectedStrategiesExtras: WritableSignal<Strategy[]> = signal<Strategy[]>([]);
  isCloseable: boolean = false;
  strategies = signal<Strategy[]>([]);

  constructor() {
    effect(() => {
      if ( this.robot()().id ) {
        this.strategyService.getStrategiesByRobotId(this.robot()().id)
          .subscribe({
            next: (res) => {
              this.strategies.set(res);
            }
          });
        }
    })
  }
  
  ngOnInit(): void {
      this.messages = [{ severity: 'warn', detail: 'Las estrategías que superen el límite de la licencia selecionada, tendrán un costo adicional.' }];

      this.qtyStrategies = this.purchaseService.selectedLicense().qtyStrategies;
  }

  handleCloseAlert() {
    this.messages = [];
    this.isCloseable = false;
  }

  handleSelectStrategy(strategy: Strategy): void {
    const indexStrategy = this.selectedStrategies().findIndex(item => strategy.id == item.id);
    
    if (indexStrategy > -1) {
      this.selectedStrategies().splice(indexStrategy, 1);

      if (this.selectedStrategies().length >= this.qtyStrategies) {
        if ((indexStrategy + 1) <= this.qtyStrategies) {
          this.selectedStrategies()[this.qtyStrategies - 1].price = 0;
        }
      }
    } else {
      if (this.purchaseService.selectedLicense != undefined) {
        if (this.qtyStrategies > this.selectedStrategies().length) {
          this.selectedStrategies().push({
            ...strategy,
            price: 0,
          });
        } else {
          this.selectedStrategies().push({
            ...strategy,
            price: strategy.price
          });
          if (this.messages.length <= 0) {
            this.messages = [{ severity: 'warn', detail: 'Las estrategías que superen el límite de la licencia selecionada, tendrán un costo adicional.' }];
          }
          this.isCloseable = true;

        }
      }
    }

    this.purchaseService.selectedStrategies = [...this.selectedStrategies()];
    console.log('selected strategies: ', this.purchaseService.selectedStrategies);
  }

  getLabel(strategy: Strategy): String {
    return this.selectedStrategies().findIndex(item => strategy.id == item.id) > -1 ? 'Añadido' : 'Añadir';
  }

  isSelected(strategy: Strategy): boolean {
    return this.selectedStrategies().findIndex(item => strategy.id == item.id) > -1;
  }

  checkSelectedStrategy(strategy: Strategy): boolean {
    return this.selectedStrategies().filter(item => strategy.id == item.id).length > 0;
  }

  getBorderColor(strategy: Strategy) {
    if (this.checkSelectedStrategy(strategy)) {
      const strategyFound = this.selectedStrategies().find(item => strategy.id == item.id);

      if (strategyFound) { 
        return strategyFound.price == 0 ? 'border-primary' : 'border-yellow-500';
      }
    }
    return 'border-[#E2E5EA]';
  }

  nextStep() {
    this.selectedStrategies().forEach(strategy => {
      this.purchaseService.cartItem().itemsExtra.push({
        itemName: strategy.name,
        itemType: 'STRATEGY',
        itemElementId: strategy.id,
        itemPrice: parseInt(strategy.price),
        quantity: 1,
        totalPrice: parseInt(strategy.price),
      });
    });
    
    this.nextCallback.emit();
  }

}
