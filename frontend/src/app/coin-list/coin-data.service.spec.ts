import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoinDataService } from './coin-data.service';
import { Socket } from 'ngx-socket-io';

describe('CoinDataService', () => {
  let service: CoinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Socket, useValue: { connect: () => {}, on: () => {} } },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CoinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
