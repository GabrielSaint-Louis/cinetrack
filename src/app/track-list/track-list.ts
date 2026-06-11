import { Component, computed, input, signal } from '@angular/core';
import { TrackCard } from '../track-card/track-card';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {
  tracks = input.required<Track[]>();
  protected selectedId = signal<number | null>(null);
  protected query = signal('');

  protected filteredTracks = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.tracks();
    }

    return this.tracks().filter(
      (track) =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query),
    );
  });

  protected selectTrack(track: Track): void {
    this.selectedId.set(track.id);
  }
}
