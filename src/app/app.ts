import { Component, signal } from '@angular/core';
import { TrackList } from './track-list/track-list';
import { TrackForm } from './track-form/track-form';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected tracks = signal<Track[]>([
    {
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
    },
    {
      id: 2,
      title: 'As It Was',
      artist: 'Harry Styles',
      album: "Harry's House",
      genre: 'Pop',
      durationSeconds: 167,
      year: 2022,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/2/300',
    },
    {
      id: 3,
      title: 'Get Lucky',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      genre: 'Disco',
      durationSeconds: 248,
      year: 2013,
      rating: 9,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/3/300',
    },
    {
      id: 4,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      album: 'When We All Fall Asleep',
      genre: 'Electropop',
      durationSeconds: 194,
      year: 2019,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/4/300',
    },
    {
      id: 5,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      genre: 'Disco-pop',
      durationSeconds: 203,
      year: 2020,
      rating: 7,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/5/300',
    },
    {
      id: 6,
      title: 'Uptown Funk',
      artist: 'Mark Ronson',
      album: 'Uptown Special',
      genre: 'Funk',
      durationSeconds: 270,
      year: 2014,
      rating: 9,
      favorite: true,
      coverUrl: 'https://picsum.photos/seed/6/300',
    },
    {
      id: 7,
      title: 'Espresso',
      artist: 'Sabrina Carpenter',
      album: "Short n' Sweet",
      genre: 'Pop',
      durationSeconds: 175,
      year: 2024,
      rating: 8,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/7/300',
    },
    {
      id: 8,
      title: 'Flowers',
      artist: 'Miley Cyrus',
      album: 'Endless Summer Vacation',
      genre: 'Pop',
      durationSeconds: 200,
      year: 2023,
      rating: 7,
      favorite: false,
      coverUrl: 'https://picsum.photos/seed/8/300',
    },
  ]);

  protected addTrack(track: Track): void {
    this.tracks.update((tracks) => [track, ...tracks]);
  }
}
