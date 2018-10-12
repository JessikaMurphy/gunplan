import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,    
    MatGridListModule,
    MatIconModule,
    MatTabsModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        MatTabsModule],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatGridListModule,
        MatTabsModule,
        MatIconModule,
    ],
})

export class MaterialComponent { }