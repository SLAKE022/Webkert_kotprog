import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker } from '@angular/material/datepicker';


export interface Product {
  id: number;
  name: string;
  category: string;
  expireDate: string;
  inStock: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepicker
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['name', 'category', 'inStock', 'expireDate', 'actions', 'actions1'];

  newProduct: Product = {
    id: 0,
    name: '',
    category: '',
    expireDate: '',
    inStock: false
  };

  products: Product[] = [
    {
      id: 1,
      name: 'Bio Almalevek',
      category: 'Italok',
      expireDate: '2025-05-01',
      inStock: true
    },
    {
      id: 2,
      name: 'Zabpehely',
      category: 'Gabona',
      expireDate: '2025-08-15',
      inStock: false
    }
  ];

  addProduct(): void {
    if (this.newProduct.name.trim() && this.newProduct.category.trim()) {
      const newEntry: Product = {
        ...this.newProduct,
        id: this.products.length + 1
      };
      this.products = [...this.products, newEntry];
      this.newProduct = { id: 0, name: '', category: '', expireDate: '', inStock: false };
    }
  }
  deleteTask(index: number): void {
    this.products = this.products.filter((_, i) => i !== index);
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}