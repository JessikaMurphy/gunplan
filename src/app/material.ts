import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatCheckboxModule,
    MatGridTile, 
    MatGridList,
    MatTabsModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatGridTile,
        MatGridList,
        MatTabsModule],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatGridTile,
        MatGridList,
        MatTabsModule
    ],
})

export class MaterialComponent { }