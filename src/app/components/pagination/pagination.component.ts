import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PageService } from 'src/app/providers/page.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() list: any[] = [];
  @Output() pageChange = new EventEmitter();

  public pageNumbers: number[] = [];
  public currentPage = 0;
  public itensPerPage = 10;
  public totalPages = 0;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.startPage();
  }

  startPage() {
    const obj = this.pageService.handlePages(this.list)
    const { pageNumber, totalPages } = obj;
    this.pageNumbers = pageNumber;
    this.totalPages = totalPages;
  }

  handlePage(page: number) {
    this.currentPage = page;
    const indexLast = this.currentPage * this.itensPerPage;
    const indexFirst = indexLast - this.itensPerPage;
    const newList = this.list?.slice(indexFirst, indexLast);
    this.pageChange.emit(newList);
  }
}
