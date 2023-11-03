import { StoreService } from './../../services/store.service';
import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import colors from 'src/app/globals/colors';
import countries from 'src/app/globals/countries';
import providers from 'src/app/globals/providers';
import sizes from 'src/app/globals/sizes';
import { Router } from '@angular/router';
import shippingModes from 'src/app/globals/shippingModes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DuckData } from '../warehouse/list/list.component';

export interface OrderDetail {
  id: number;
  duck: DuckData;
  quantity: number;
  subTotal: number;
  packageType: string;
  protectionType: string;
  total: number;
  discounts: Discount[];
  increments: Increment[];
}

export interface Discount {
  name: string;
  discount: string;
}

export interface Increment {
  name: string;
  increment: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  private fb = inject(FormBuilder);

  orderForm: any;

  hasUnitNumber = false;

  countries = countries;

  providers = providers;

  colors = colors;

  sizes = sizes;

  shippingModes = shippingModes;

  constructor(
    private storeService: StoreService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.orderForm = this.fb.group({
      color: [
        { value: this.storeService.duckToSell?.color, disabled: true },
        Validators.required,
      ],
      size: [
        { value: this.storeService.duckToSell?.size, disabled: true },
        Validators.required,
      ],
      quantity: [null, Validators.required],
      provider: [
        { value: this.storeService.duckToSell?.provider, disabled: true },
        Validators.required,
      ],
      country: [
        { value: this.storeService.duckToSell?.country, disabled: true },
        Validators.required,
      ],
      destinationCountry: [null, Validators.required],
      shippingMode: [null, Validators.required],
    });
  }

  openDialogDetail(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogDetailOrder, {
      width: '42rem',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      autoFocus: true,
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }

    this.storeService.createOrder(this.orderForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('ORDER CREATION SUCCESS!!', response);
        this.storeService.orderDetail = response;
        this.openDialogDetail('200ms', '200ms');
        // this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        alert('Error!');
        console.error('Error in order creation service: ', err.message ?? err);
      },
    });
  }

  // clickOK() {
  //   this.dialog.closeAll();
  //   this.router.navigateByUrl('/dashboard');
  // }
}

interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'dialog-detail-order',
  templateUrl: './dialog-detail-order.html',
})
export class DialogDetailOrder {
  orderDetail?: OrderDetail;
  displayedColumns: string[] = [
    'id',
    'color',
    'size',
    'price',
    'quantity',
    'provider',
    'country',
    'total',
  ];
  ducks: DuckData[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogDetailOrder>,
    private storeService: StoreService,
    private router: Router
  ) {
    this.orderDetail = this.storeService.orderDetail;
    this.ducks = [this.orderDetail?.duck!];
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.orderDetail?.total;
  }

  clickOK() {
    this.router.navigateByUrl('/dashboard');
  }
}
