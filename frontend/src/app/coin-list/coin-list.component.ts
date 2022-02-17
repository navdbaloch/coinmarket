import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinDataService, ICoin } from './coin-data.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css'],
})
export class CoinListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort?: MatSort | undefined;
  displayedColumns: string[] = [
    'watch_list',
    'cmcRank',
    'name',
    'price',
    'percentChange24h',
    'percentChange7d',
    'marketCap',
    'volume24h',
    'totalSupply',
    'action',
  ];
  dataSource = new MatTableDataSource<ICoin>();

  constructor(private dataSerice: CoinDataService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
  }

  ngOnInit(): void {
    this.dataSerice.getData().subscribe((coins) => {
      this.dataSource.data = coins;
    });
  }
}
