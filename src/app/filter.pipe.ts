import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paint_filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items; searchText = searchText.toLowerCase(); return items.filter(it => {
            return it.paintName.toLowerCase().includes(searchText);
        });
    }
}
@Pipe({
    name: 'kit_filter'
})
export class KitFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items; searchText = searchText.toLowerCase(); return items.filter(kit => {
            return kit.title.toLowerCase().includes(searchText);
        });
    }
}
@Pipe({
    name: 'series_filter'
})
export class SeriesFilterPipe implements PipeTransform {
    transform(items: any[], series: string): any[] {
        if (!items) return [];
        if (!series) return items; series = series.toLowerCase(); return items.filter(kit => {
            return kit.series.toLowerCase().includes(series);
        });
    }
}

