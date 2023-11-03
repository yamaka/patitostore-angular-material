import { StoreService } from './../../../services/store.service';
import { DialogService } from './../../../services/dialog.service';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import colors from 'src/app/globals/colors';
import sizes from 'src/app/globals/sizes';
import { FormBuilder, Validators } from '@angular/forms';

export interface DuckData {
  id: number;
  color: string;
  size: string;
  price: number;
  quantity: number;
  provider: string;
  country: string;
  productionAt: string;
  deleted: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  displayedColumns: string[] = [
    'id',
    'color',
    'size',
    'price',
    'quantity',
    'provider',
    'country',
    'action',
  ];
  dataSource!: MatTableDataSource<DuckData>;
  posts: any;
  ducks: DuckData[] = [];
  duckSeleted!: DuckData | null;

  private fb = inject(FormBuilder);
  duckForm = this.fb.group({
    color: [''],
    size: [''],
  });

  colors = colors;
  sizes = sizes;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private warehouseServive: WarehouseService,
    private router: Router,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(params: any = {}) {
    this.warehouseServive.fetchDucks(params).subscribe((data) => {
      console.log('fetchDucks data', data);
      this.ducks = data.content;

      this.dataSource = new MatTableDataSource(this.ducks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogService
      .getConfirmDialog$()
      .subscribe((showConfirmSwal: boolean) => {
        console.log('showConfirmSwal', showConfirmSwal);

        if (showConfirmSwal) {
          this.delete();
        }
        this.dialog.closeAll();
      });

    this.dialog.open(DialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  createDuck() {
    this.router.navigateByUrl('/warehouse/create');
  }

  edit(duck: DuckData) {
    this.warehouseServive.duckSeleted = duck;
    this.router.navigateByUrl('/warehouse/update');
  }

  openDialogDelete(duck: DuckData) {
    this.duckSeleted = duck;
    this.openDialog('200ms', '200ms');
  }

  delete() {
    console.log('delete');

    this.warehouseServive.deleteDuck(this.duckSeleted!.id).subscribe({
      next: (response) => {
        console.log('DELETION SUCCESS!!', response);

        this.getData();
        this.duckSeleted = null;
      },
      error: (err) => {
        alert('Error!');
        console.error('Error in delete service: ', err.message ?? err);
      },
    });
  }

  goToSell(duck: DuckData) {
    this.duckSeleted = duck;
    this.storeService.duckToSell = duck;
    this.router.navigateByUrl('/store');
  }

  searchDuck() {
    console.log('searchDuck form', this.duckForm.getRawValue());
    this.getData(this.duckForm.getRawValue());
  }
}
