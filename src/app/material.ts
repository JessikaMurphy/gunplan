import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,    
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSliderModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatGridListModule,
        MatExpansionModule,
        MatSliderModule,
        MatTabsModule],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatExpansionModule,
        MatSliderModule,
        MatTabsModule,
        MatIconModule,
    ],
})

export class MaterialComponent { }