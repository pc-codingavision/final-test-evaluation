import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule { }
