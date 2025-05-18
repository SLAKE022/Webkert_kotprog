import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';

import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  title: string = 'Termékkezelés';
  displayedColumns: string[] = ['name', 'category', 'stock', 'expire', 'actions', 'actions1'];
  productForm!: FormGroup;
  products: Product[] = [];
  isLoading = false;
  private subscriptions: Subscription[] = [];
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  lastExpireDate: Date | null = null;
  lastProductName: string | undefined = undefined;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      stock: [true],
      expire: ['', Validators.required] // string formátum: 'YYYY-MM-DD'
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    const sub = this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products]; // új sor
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a termékek betöltésekor:', err);
        this.showNotification('Hiba a termékek betöltésekor', 'error');
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  deleteProduct(productId: string): void {
    if (confirm('Biztosan törölni szeretnéd a terméket?')) {
      this.isLoading = true;
      this.productService.deleteProduct(productId)
        .then(() => {
          this.loadProducts();
          this.showNotification('Termék sikeresen törölve', 'success');
        })
        .catch(error => {
          console.error('Hiba a termék törlésekor:', error);
          this.showNotification('Hiba a termék törlésekor', 'error');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Bezár', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`]
    });
  }
  filterProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredProducts = [...this.products];
      console.log(this.filteredProducts);
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }

  loadInStockProducts(): void {
  this.isLoading = true;
  const sub = this.productService.getAllProductsInStock().subscribe({
    next: (products) => {
      this.products = products;
      this.filteredProducts = [...products]; // új sor
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Hiba a termékek betöltésekor:', err);
      this.showNotification('Hiba a termékek betöltésekor', 'error');
      this.isLoading = false;
    }
  });
  this.subscriptions.push(sub);
}
loadExpireSoon(): void {
  this.isLoading = true;
  const sub = this.productService.getExpireSoon().subscribe({
    next: (products) => {
      this.products = products;
      this.filteredProducts = [...products]; // új sor
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Hiba a termékek betöltésekor:', err);
      this.showNotification('Hiba a termékek betöltésekor', 'error');
      this.isLoading = false;
    }
  });
  this.subscriptions.push(sub);
}
loadExpiredOutOfStock(): void {
  this.isLoading = true;
  const sub = this.productService.getExpiredOutOfStock().subscribe({
    next: (products) => {
      this.products = products;
      this.filteredProducts = [...products]; // új sor
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Hiba a termékek betöltésekor:', err);
      this.showNotification('Hiba a termékek betöltésekor', 'error');
      this.isLoading = false;
    }
  });
  this.subscriptions.push(sub);
}
}