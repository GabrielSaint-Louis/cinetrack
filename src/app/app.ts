import { Component, signal } from '@angular/core';
import { TrackCard } from './track-card/track-card';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected current = signal<Track>({
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synth-pop',
    durationSeconds: 200,
    year: 2019,
    rating: 9,
    favorite: true,
    coverUrl: 'https://picsum.photos/seed/1/300',
  });
}
