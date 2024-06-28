import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, input, output } from '@angular/core';

@Component({
  selector: 'fwa-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  type = input<'solid' | 'outlet'>('solid');
  onClick = output();
  bgStyles = computed(() => this.type() == 'solid' ? 'bg-primary hover:bg-blueDark text-white' : 'bg-white hover:bg-primary hover:text-white text-primary border border-1 border-primary');

  constructor() {
  }

  ngOnInit(): void {
    
  }
}
