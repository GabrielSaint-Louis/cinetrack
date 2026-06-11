import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Track } from '../models/track';
import { FavoritesService } from '../services/favorites.service';
import { TrackList } from '../track-list/track-list';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-favorites',
  imports: [TrackList],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private favoritesService = inject(FavoritesService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected favoritesEnabled = environment.features.favorites;
  protected favoriteError = signal(false);

  private loaded = toSignal(this.favoritesService.getFavorites(), {
    initialValue: [] as Track[],
  });
  protected tracks = signal<Track[]>([]);

  constructor() {
    effect(() => this.tracks.set(this.loaded()));
  }

  protected openTrack(id: number): void {
    this.router.navigate(['/tracks', id]);
  }

  protected onFavoriteToggle(track: Track): void {
    // Every track on this page is a favorite, so toggling means removing it.
    this.favoriteError.set(false);

    this.favoritesService
      .remove(track.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () =>
          this.tracks.update((tracks) => tracks.filter((current) => current.id !== track.id)),
        error: () => this.favoriteError.set(true),
      });
  }
}
