import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  handlePages(total: number): any {
    let pageNumbers = [];

    const totalPages = Math.ceil(total / 10);
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return { pageNumber: pageNumbers, totalPages: totalPages };
  }
}
