import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandingsComponent } from '../standings/standings.component';
import { Country } from '../types/country.type';

@Component({
  selector: 'app-football-updates',
  standalone: true,
  imports: [CommonModule, StandingsComponent],
  templateUrl: './football-updates.component.html',
  styleUrl: './football-updates.component.css'
})
export class FootballUpdatesComponent {
  selectedCountry: Country = Country.ENGLAND;

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.fragment) {
      const fragment = this.route.snapshot.fragment;
      this.selectedCountry = Object.values(Country).includes(fragment as Country) ?
        fragment as Country : Country.ENGLAND;
    }
  }

  get country() {
    return Country;
  }

  navElementId(country: string) {
    return `${country.toLowerCase()}Select`;
  }

  toggleCountry(country: Country) {
    this.router.navigateByUrl('#' + country);
    this.selectedCountry = country;
  }
}
