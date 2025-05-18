import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateComponent } from './pages/update/update.component';
import { AddComponent } from './pages/add/add.component';
import { NgIf } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MenuComponent, 
      HomeComponent,
     ProductsComponent, 
     ProfileComponent, 
     UpdateComponent, 
     AddComponent, 
     MatButtonModule,
     MatIconModule,
     MatSidenav,
     MatSidenavModule,
     MatToolbarModule,
     RouterLink,
     NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bio-bolt';
  isLoggedIn = false;
  page = "home";
  private authSubscription?: Subscription;
  constructor(private authService: AuthService) {}
  opened = false;
  isHandset = window.innerWidth <= 800;
  /*
  changePage(selectedPage: string) {
    this.page = selectedPage;
  }*/
    ngOnInit(): void {
      this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
    }
    ngOnDestroy(): void {
        this.authSubscription?.unsubscribe();
      }
    onToggleSidenav(sidenav: any) {
    sidenav.toggle();
  }
    checkLoginStatus(): void {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  
    logout(): void {
      this.isLoggedIn = false;
      this.authService.signOut();
    }
}
