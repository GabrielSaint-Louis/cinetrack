import { Component, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format.pipe';
import { HighlightFavorite } from '../directives/highlight-favorite.directive';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe, HighlightFavorite],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  favoriteEnabled = input(false);
  select = output<Track>();
  favoriteToggled = output<Track>();

  protected selectTrack(): void {
    this.select.emit(this.track());
  }

  protected toggleFavorite(event: Event): void {
    // Keep the favorite action from triggering the card's "open detail" click.
    event.stopPropagation();
    this.favoriteToggled.emit(this.track());
  }
}
