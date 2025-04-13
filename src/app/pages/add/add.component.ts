import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  category: string;
  expireDate: string;
  inStock: boolean;
}

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  productForm: FormGroup;
  displayedColumns: string[] = ['name', 'category', 'inStock', 'expireDate', 'actions'];
  products: Product[] = [];

  constructor(private fb: FormBuilder) {
    // Form inicializálása
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      expireDate: ['', Validators.required],
      inStock: [false]
    });
  }

  ngOnInit(): void {
    // Alapértelmezett termékek
    this.products = [
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
  }

  // Termék hozzáadása
  addProduct(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const newProduct: Product = {
        id: this.products.length + 1,
        name: formValue.name,
        category: formValue.category,
        expireDate: formValue.expireDate,
        inStock: formValue.inStock
      };

      this.products = [...this.products, newProduct];
      this.productForm.reset({ inStock: false });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Hibák kezelése a formon
  getFormControlError(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'Kötelező mező';
      }
      if (control.errors?.['minlength']) {
        return `Legalább ${control.errors['minlength'].requiredLength} karakter szükséges`;
      }
    }
    return '';
  }
}
