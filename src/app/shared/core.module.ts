import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatIconModule
    ],
    exports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatIconModule
    ],
})
export class CoreModule{}
