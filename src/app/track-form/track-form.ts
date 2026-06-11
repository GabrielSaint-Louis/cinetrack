import { Component, output, signal } from '@angular/core';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';

const currentYear = new Date().getFullYear();

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  created = output<Track>();

  protected model = signal({ title: '', artist: '', rating: 5 });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const { title, artist, rating } = this.model();
    this.created.emit({
      id: Date.now(),
      title,
      artist,
      album: '',
      genre: '',
      durationSeconds: 0,
      year: currentYear,
      rating,
      favorite: false,
      coverUrl: `https://picsum.photos/seed/cinetrack-${Date.now()}/300`,
    });

    this.model.set({ title: '', artist: '', rating: 5 });
  }
}
