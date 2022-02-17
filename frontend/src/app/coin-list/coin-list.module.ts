import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { CoinListComponent } from './coin-list.component';
import { CoinDataService } from './coin-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CoinListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoinListComponent,
      },
    ]),
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [CoinDataService],
})
export class CoinListModule {}
