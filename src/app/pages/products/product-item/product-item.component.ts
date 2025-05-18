import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../products.component'; 

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() stockChanged = new EventEmitter<Product>();

  toggleStock(): void {
    this.product.isInStock = !this.product.isInStock;
    this.stockChanged.emit(this.product);
  }
}
