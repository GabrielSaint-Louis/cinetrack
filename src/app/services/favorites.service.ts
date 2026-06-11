import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/favorites`;

  getFavorites() {
    return this.http.get<Track[]>(this.baseUrl);
  }

  add(trackId: number) {
    return this.http.post<void>(`${this.baseUrl}/${trackId}`, {});
  }

  remove(trackId: number) {
    return this.http.delete<void>(`${this.baseUrl}/${trackId}`);
  }
}
