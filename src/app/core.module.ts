import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class CoreModule{}
