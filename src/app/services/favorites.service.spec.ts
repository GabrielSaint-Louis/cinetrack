import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Track } from '../models/track';

import { FavoritesService } from './favorites.service';

const baseUrl = 'http://localhost:3000/favorites';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FavoritesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches the favorites list with GET /favorites', () => {
    let result: Track[] | undefined;
    service.getFavorites().subscribe((tracks) => (result = tracks));

    const request = http.expectOne(baseUrl);
    expect(request.request.method).toBe('GET');
    request.flush([]);

    expect(result).toEqual([]);
  });

  it('adds a favorite with POST /favorites/:id', () => {
    service.add(42).subscribe();

    const request = http.expectOne(`${baseUrl}/42`);
    expect(request.request.method).toBe('POST');
    request.flush(null);
  });

  it('removes a favorite with DELETE /favorites/:id', () => {
    service.remove(42).subscribe();

    const request = http.expectOne(`${baseUrl}/42`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
