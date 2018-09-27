import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    
    MatGridListModule,
    MatTabsModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        
        MatGridListModule,
        MatTabsModule],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
       
        MatGridListModule,
        MatTabsModule
    ],
})

export class MaterialComponent { }