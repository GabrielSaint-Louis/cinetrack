import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackList } from './track-list/track-list';
import { TrackForm } from './track-form/track-form';
import { TrackDetail } from './track-detail/track-detail';
import { Track } from './models/track';
import { TrackService } from './services/track.service';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm, TrackDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private trackService = inject(TrackService);

  // The API is the source of truth; mirror it into a writable signal so the
  // form can prepend new tracks locally until the create flow hits the API.
  private loadedTracks = toSignal(this.trackService.getTracks(), {
    initialValue: [] as Track[],
  });
  protected tracks = signal<Track[]>([]);
  protected selectedId = signal<number | null>(null);

  constructor() {
    effect(() => this.tracks.set(this.loadedTracks()));
  }

  protected addTrack(track: Track): void {
    this.tracks.update((tracks) => [track, ...tracks]);
  }

  protected showTrack(id: number): void {
    this.selectedId.set(id);
  }
}
