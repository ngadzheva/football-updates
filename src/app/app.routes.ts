import { Routes } from '@angular/router';
import { FixturesComponent } from './fixtures/fixtures.component';
import { FootballUpdatesComponent } from './football-updates/football-updates.component';

export const routes: Routes = [
    {
        path: 'team/:id',
        component: FixturesComponent
    },
    {
        path: '',
        pathMatch: 'full',
        component: FootballUpdatesComponent
    }
];
