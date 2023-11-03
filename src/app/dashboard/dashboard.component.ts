import { WarehouseService } from 'src/app/services/warehouse.service';
import { Component, inject } from '@angular/core';

export interface DashboardType {
  totalSales: number;
  ducksQuantity: number;
  bestSellingDuck: BestSellingDuck;
  ordersByCountry: OrdersByCountry[];
}

export interface BestSellingDuck {
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

export interface OrdersByCountry {
  total: number;
  country?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  dashBoard: DashboardType = {
    totalSales: 0,
    ducksQuantity: 0,
    bestSellingDuck: {
      id: 0,
      color: '',
      size: '',
      price: 0,
      quantity: 0,
      provider: '',
      country: '',
      productionAt: '',
      deleted: false,
    },
    ordersByCountry: [],
  };

  displayedColumns: string[] = ['sales', 'country'];
  ordersByCountry: OrdersByCountry[] = [];

  constructor(private wareHouseService: WarehouseService) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.wareHouseService.getDashboard().subscribe((data) => {
      console.log('fetchDucks data', data);
      this.dashBoard = data;
      this.ordersByCountry = data.ordersByCountry;
    });
  }
}
