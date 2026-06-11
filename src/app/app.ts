import { Component, inject, signal } from '@angular/core';
import { TrackSearch } from './track-search/track-search';
import { TrackDetail } from './track-detail/track-detail';
import { AuthLogin } from './auth-login/auth-login';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [TrackSearch, TrackDetail, AuthLogin],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected auth = inject(AuthService);
  protected selectedId = signal<number | null>(null);

  protected showTrack(id: number): void {
    this.selectedId.set(id);
  }
}
