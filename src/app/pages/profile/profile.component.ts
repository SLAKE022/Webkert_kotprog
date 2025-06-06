import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoading = true;

  private subscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  getUserInitials(): string {
    if (!this.user?.name) return '?';
    
    const firstInitial = this.user.name.firstname?.charAt(0).toUpperCase() || '';
    const lastInitial = this.user.name.lastname?.charAt(0).toUpperCase() || '';
    
    return firstInitial + lastInitial;
  }
}
