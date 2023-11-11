import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  EventEmitter,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSelect } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatOption } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";

interface $pagination {
  length: number;
  size?: number;
  index?: number;
  sizeOptions?: Array<any>[];
}
@Component({
  selector: "shd-ng-mat-table",
  templateUrl: "./ng-mat-table.component.html",
  styleUrls: ["./ng-mat-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NgMatTableComponent implements OnInit {
  get displayedColumns(): string[] {
    return this.columns.map((c) => c.columnDef);
  }
  get dataSource(): any {
    return this._dataSource;
  }
  @Input()
  set dataSource(result: any) {
    if (result && this.isAsync) {
      this._dataSource = new MatTableDataSource(result);
    } else {
      this._dataSource = result;
    }
  }
  get pagination(): $pagination {
    return this._pagination;
  }
  @Input()
  set pagination(value: $pagination) {
    if (value) {
      this._pagination = {
        length: value.length ? value.length : 100,
        size: value.size ? value.size : 10,
        sizeOptions: value.sizeOptions ? value.sizeOptions : [10, 25, 50, 100],
        index: value.index ? value.index : 0,
      };
    } else {
      this._pagination = {
        length: 100,
        size: 10,
        sizeOptions: [10, 25, 50, 100],
        index: 0,
      };
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  // @Input() dataSet: any;
  // @Input() dataSource: any;
  @Input() asyncDataSource: any;
  @Input() columns: any;
  @Input() gridConfig: any;
  @Input() selection: SelectionModel<any>;
  @Input() isAsync: boolean;
  @Input() popper: boolean;
  @Output() page = new EventEmitter<any>();
  @Output() sort = new EventEmitter<any>();
  allSelected = false;
  @Input() isLoading: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortor: MatSort;
  @ViewChild("select") select: MatSelect;
  @ViewChild("sidenavNotice") sidenavNotice;
  private _dataSource;

  private _pagination;
  rowDataPopup: any;

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (!this.isAsync) {
      // Call this function is data is not async
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sortor;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  chkbxMasterHeader() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  getRowRecord(row) {
    if (this.popper) {
      this.rowDataPopup = row;
      this.sidenavNotice.toggle();
    }
  }

  handlePageEvent(pageEvt: PageEvent) {
    const paging = pageEvt;
    if (this.isAsync) {
      const _pagination = { page: JSON.stringify(this.esPaging(paging)) };
      this.updateQueryParam(_pagination);
      // emit api only if its async
      this.page.emit(_pagination);
    }
  }

  esPaging(pagination) {
    const esPage = {
      length: pagination.length,
      size: pagination.pageSize,
      from: pagination.pageIndex * pagination.pageSize,
    };
    return esPage;
  }

  handleSortChange(sort: Sort) {
    const sorting = sort;
    if (this.isAsync) {
      const _sorting = { sort: JSON.stringify(this.esSorting(sorting)) };
      this.updateQueryParam(_sorting);
      this.sort.emit(_sorting);
    }
  }

  esSorting(sorting) {
    const temp = {};
    temp[sorting.active] = sorting.direction;
    return temp;
  }

  updateQueryParam(query) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...queryParams, ...query },
      queryParamsHandling: "merge",
    });
  }
}
