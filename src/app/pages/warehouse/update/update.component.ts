import providers from 'src/app/globals/providers';
import { Router } from '@angular/router';
import { WarehouseService } from './../../../services/warehouse.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import countries from 'src/app/globals/countries';
import colors from 'src/app/globals/colors';
import sizes from 'src/app/globals/sizes';
import { DuckData } from '../list/list.component';

@Component({
  selector: 'app-create',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  private fb = inject(FormBuilder);

  duckForm: any;

  hasUnitNumber = false;

  countries = countries;

  providers = providers;

  colors = colors;

  sizes = sizes;

  duckSeleted!: DuckData | null;

  constructor(
    private wareHouseService: WarehouseService,
    private router: Router
  ) {
    this.duckSeleted = this.wareHouseService.duckSeleted;
    this.duckForm = this.fb.group({
      color: [
        { value: this.duckSeleted?.color, disabled: true },
        Validators.required,
      ],
      size: [
        { value: this.duckSeleted?.size, disabled: true },
        Validators.required,
      ],
      price: [this.duckSeleted?.price, Validators.required],
      quantity: [this.duckSeleted?.quantity, Validators.required],
      provider: [
        { value: this.duckSeleted?.provider, disabled: true },
        Validators.required,
      ],
      country: [
        { value: this.duckSeleted?.country, disabled: true },
        Validators.required,
      ],
      productionAt: [
        { value: this.duckSeleted?.productionAt, disabled: true },
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    console.log('onSubmit', this.duckForm.getRawValue());
    console.log('invalid', this.duckForm.invalid);

    if (this.duckForm.invalid) {
      return;
    }

    this.wareHouseService.updatDuck(this.duckForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('UPDATE SUCCESS!!', response);
        this.wareHouseService.duckSeleted = null;
        this.router.navigateByUrl('/warehouse');
      },
      error: (err) => {
        alert('Error!');
        console.error('Error in creation service: ', err.message ?? err);
      },
    });
  }
}
