import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';

import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { CoinDataService, ICoinData } from './coin-data.service';

import { CoinListComponent } from './coin-list.component';
const stubData: ICoinData = {
  data: [
    {
      id: 1,
      circulating_supply: 1,
      cmc_rank: 1,
      date_added: '',
      last_updated: '',
      max_supply: 1212,
      name: 'Bitcoin',
      num_market_pairs: 111,
      quote: {
        USD: {
          fully_diluted_market_cap: 1,
          last_updated: '',
          market_cap: 1,
          market_cap_dominance: 1,
          percent_change_1h: 1,
          percent_change_24h: 1,
          percent_change_30d: 1,
          percent_change_60d: 2,
          percent_change_7d: 3,
          percent_change_90d: 4,
          price: 1,
          volume_24h: 1,
          volume_change_24h: 1,
        },
      },
      self_reported_circulating_supply: 1,
      self_reported_market_cap: 1,
      slug: '',
      symbol: 'BIT',
      tags: [],
      total_supply: 1,
    },
  ],
};

describe('CoinListComponent', () => {
  let component: CoinListComponent;
  let fixture: ComponentFixture<CoinListComponent>;
  let loader: HarnessLoader;
  const dataSub = new Subject();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinListComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatMenuModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CoinDataService,
          useValue: {
            getData: () => {
              return dataSub.asObservable();
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render data', fakeAsync(async () => {
    const table = await loader.getHarness(MatTableHarness);
    expect((await table.getRows()).length).toBe(0);
    dataSub.next(stubData);
    tick();
    expect((await table.getRows()).length).toBe(stubData.data.length);
  }));
});
