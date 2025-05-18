import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]), // <-- új mező
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });
  
  
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
  if (this.signUpForm.invalid) {
    this.signupError = 'Please correct any errors on the form before submitting.';
    return;
  }

  const password = this.signUpForm.get('password')?.value;
  const rePassword = this.signUpForm.get('rePassword')?.value;

  if (password !== rePassword) {
    this.signupError = 'The passwords do not match.';
    return;
  }

  this.isLoading = true;
  this.showForm = false;

  const email = this.signUpForm.get('email')?.value ?? '';
  const address = this.signUpForm.get('address')?.value ?? '';
  const pw = this.signUpForm.value.password || '';

  const userData: Partial<User> = {
    name: {
      firstname: this.signUpForm.value.name?.firstname || '',
      lastname: this.signUpForm.value.name?.lastname || ''
    },
    email: email
  };

  this.authService.signUp(email, pw, userData, address)
    .then(userCredential => {
      console.log('Registration successful:', userCredential.user);
      this.authService.updateLoginStatus(true);
      this.router.navigateByUrl('/home');
    })
    .catch(error => {
      console.error('Registration error:', error);
      this.isLoading = false;
      this.showForm = true;

      switch (error.code) {
        case 'auth/email-already-in-use':
          this.signupError = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          this.signupError = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          this.signupError = 'Password is too weak. Use at least 6 characters.';
          break;
        default:
          this.signupError = 'An error occurred during registration. Please try again later.';
      }
    });
}


  generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}