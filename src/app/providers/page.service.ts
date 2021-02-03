import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageNumbers: any = [];

  constructor() { }

  handlePages(list: any): any {
    this.pageNumbers = [];
    const totalPages = Math.ceil(list.length / 10);
    for (let i = 1; i <= totalPages; i++) {
      this.pageNumbers.push(i);
    }

    return { pageNumber: this.pageNumbers, totalPages: totalPages };
  }
}
