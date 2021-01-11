import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

   ngOnInit(): void {
    this.totalPages = Math.ceil(this.list.length / 10);
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
   }

   handlePage(page: number): void {
    this.currentPage = page;

    const indexLast = this.currentPage * this.itensPerPage;
    const indexFirst = indexLast - this.itensPerPage;
    const newList = this.list?.slice(indexFirst, indexLast);

    this.pageChange.emit(newList);
   }
}
