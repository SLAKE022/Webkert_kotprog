import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileObject } from '../../shared/constant';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileObject: any = ProfileObject;

  selectedIndex: number = 0;
  ngOnInit(): void{
    this.selectedIndex = 0;
  }
  reload (index: number): void{
    this.selectedIndex = index;
  }

}
