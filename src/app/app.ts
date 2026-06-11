import { Component, signal } from '@angular/core';
import { TrackSearch } from './track-search/track-search';
import { TrackDetail } from './track-detail/track-detail';

@Component({
  selector: 'app-root',
  imports: [TrackSearch, TrackDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected selectedId = signal<number | null>(null);

  protected showTrack(id: number): void {
    this.selectedId.set(id);
  }
}
