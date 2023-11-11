import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { PageEvent, MatPaginator } from "@angular/material/paginator";

interface $pagination {
  length: number;
  size?: number;
  index?: number;
  sizeOptions?: Array<any>[];
}

@Component({
  selector: "shd-ng-mat-nested-table",
  templateUrl: "./ng-mat-nested-table.component.html",
  styleUrls: ["./ng-mat-nested-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class NgMatNestedTableComponent implements OnInit {
  @Input() dataSource: any;
  @Input() columns: any;
  @Input() gridConfig: any;
  @Input() isAsync: boolean;
  @Input() isLoading: boolean;
  @Output() page = new EventEmitter<any>();

  @ViewChild(MatPaginator) parentPaginator: MatPaginator;
  @ViewChild(MatPaginator) level1Paginator: MatPaginator;
  @ViewChild("outerSort", { static: true }) sort: MatSort;
  @ViewChildren("innerSort") innerSort: QueryList<MatSort>;
  @ViewChildren("innerTables") innerTables: QueryList<MatTable<any>>;

  // dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  // columnsToDisplay = ['attack_type', 'src_ip', 'src_port'];
  // innerDisplayedColumns = ['dst_ip', 'dst_port', 'proto'];
  expandedElement: User | null;
  parentColumns;
  level1ChildColumns;

  // private _pagination;
  // get pagination(): $pagination {
  //     return this._pagination;
  // }
  // @Input()
  // set pagination(value: $pagination) {
  //   if(value){
  //     this._pagination= {
  //       length: (value.length)?value.length: 100,
  //       size: (value.size)?value.size:10,
  //       sizeOptions: (value.sizeOptions)?value.sizeOptions:[10, 25, 50, 100],
  //       index: (value.index)?value.index:0
  //     }
  //   }
  //   else{
  //     this._pagination= {
  //       length: 100,
  //       size: 10,
  //       sizeOptions: [10, 25, 50, 100],
  //       index: 0
  //     }
  //   }
  // }

  parentPagination = {
    length: 100,
    size: 10,
    sizeOptions: [10, 25, 50, 100],
    index: 0,
  };

  level1Pagination = {
    length: 100,
    size: 10,
    sizeOptions: [10, 25, 50, 100],
    index: 0,
  };
  paginationQuery = {};

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.dataSource.sort = this.sort;
    this.parentColumns = this.columns;
    let child1 = this.columns.find((x) => x.children);
    if (child1) {
      this.level1ChildColumns = child1["children"];
    }
  }

  get displayedColumns(): any {
    let temp = {};
    temp["parentCol"] = this.columns.map((c) => c.columnDef).filter((y) => y);
    let getLevel1Children = this.columns.find((x) => x.children);

    if (getLevel1Children) {
      temp["level1Col"] = getLevel1Children.children.map((c) => c.columnDef);
    }
    return temp;
  }

  toggleRow(element: User) {
    element.children &&
    (element.children as MatTableDataSource<any>).data?.length
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<any>).sort =
          this.innerSort.toArray()[index])
    );
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<any>).filter = filterValue
          .trim()
          .toLowerCase())
    );
  }

  parentHandlePageEvent(pageEvt: PageEvent) {
    const paging = pageEvt;
    if (this.isAsync) {
      // let _pagination= {"parentPage": JSON.stringify(this.esPaging(paging))};
      this.paginationQuery["parentPage"] = JSON.stringify(
        this.esPaging(paging)
      );
      // this.updateQueryParam(_pagination);
      // emit api only if its async
      this.page.emit(this.paginationQuery);
    }
  }

  level1HandlePageEvent(pageEvt: PageEvent) {
    const paging = pageEvt;
    if (this.isAsync) {
      this.paginationQuery["level1Page"] = JSON.stringify(
        this.esPaging(paging)
      );
      // this.updateQueryParam(_pagination);
      // emit api only if its async
      this.page.emit(this.paginationQuery);
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
}

export interface User {
  children?: MatTableDataSource<any>;
}
