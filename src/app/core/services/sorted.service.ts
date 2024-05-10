import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortedService {
  compare(v1: string | number, v2: string | number): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sorted<T>(direction: 'asc' | 'desc', filterArray: T[], column: string): T[] {
    const sortedArray = [...filterArray]; // Create a new array
    sortedArray.sort((a, b) => {
      const columnParts = column.split('.'); // Separar las partes de la columna
      const propA = this.getPropertyValue(a, columnParts); // Obtener el valor de la propiedad para el objeto a
      const propB = this.getPropertyValue(b, columnParts); // Obtener el valor de la propiedad para el objeto b
      const res = this.compare(propA, propB);
      return direction === 'asc' ? res : -res;
    });
    return sortedArray;
  }

  private getPropertyValue(obj: any, props: string[]): any {
    let value = obj;
    for (const prop of props) {
      value = value[prop];
    }
    return value;
  }
}
