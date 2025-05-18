import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../../shared/services/product.service'; 
import { Product } from '../../shared/services/product.service'; 

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  productForm: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      expireDate: ['', Validators.required],
      inStock: [false]
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.isSaving = true;

      const formValue = this.productForm.value;

      const newProduct: Omit<Product, 'id'> = {
        name: formValue.name,
        category: formValue.category,
        stock: formValue.inStock,
        expire: this.formatDateToString(formValue.expireDate)
      };

      this.productService.addProduct(newProduct)
        .then(savedProduct => {
          console.log('Termék mentve:', savedProduct);
          this.productForm.reset({ inStock: false });
          alert('Sikeres mentés!');
        })
        .catch(error => {
          console.error('Hiba a mentéskor:', error);
          alert('Nem sikerült a mentés.');
        })
        .finally(() => {
          this.isSaving = false;
        });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  formatDateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getFormControlError(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'Kötelező mező';
      if (control.errors?.['minlength']) return `Legalább ${control.errors['minlength'].requiredLength} karakter szükséges`;
    }
    return '';
  }
}
