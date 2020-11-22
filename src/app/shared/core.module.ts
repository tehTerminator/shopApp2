import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
    exports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
})
export class CoreModule{}
