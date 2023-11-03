import { Router } from '@angular/router';
import { WarehouseService } from './../../../services/warehouse.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import countries from 'src/app/globals/countries';
import providers from 'src/app/globals/providers';
import colors from 'src/app/globals/colors';
import sizes from 'src/app/globals/sizes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  private fb = inject(FormBuilder);
  duckForm = this.fb.group({
    color: [null, Validators.required],
    size: [null, Validators.required],
    price: [null, Validators.required],
    quantity: [null, Validators.required],
    provider: [null, Validators.required],
    country: [null, Validators.required],
    productionAt: [null, Validators.required],
    shipping: ['free', Validators.required],
  });

  hasUnitNumber = false;

  countries = countries;

  providers = providers;

  colors = colors;

  sizes = sizes;

  constructor(
    private wareHouseService: WarehouseService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.duckForm.invalid) {
      return;
    }

    this.wareHouseService.createDuck(this.duckForm.value).subscribe({
      next: (response) => {
        console.log('CREATION SUCCESS!!', response);

        this.router.navigateByUrl('/warehouse');
      },
      error: (err) => {
        alert('Error!');
        console.error('Error in creation service: ', err.message ?? err);
      },
    });
  }
}
