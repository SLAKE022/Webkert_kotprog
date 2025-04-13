import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'bio_bolt';
  isLoggedIn = false;
  page = "home"

  /*
  changePage(selectedPage: string) {
    this.page = selectedPage;
  }*/
    ngOnInit(): void {
      this.checkLoginStatus();
    }

    onToggleSidenav(sidenav: MatSidenav){
      sidenav.toggle();
    }
    checkLoginStatus(): void {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  
    logout(): void {
      localStorage.setItem('isLoggedIn', 'false');
      this.isLoggedIn = false;
      window.location.href = '/home';
    }
}
