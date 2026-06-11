import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { FavoritesService } from '../services/favorites.service';
import { TrackList } from '../track-list/track-list';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-track-search',
  imports: [TrackList],
  templateUrl: './track-search.html',
  styleUrl: './track-search.css',
})
export class TrackSearch {
  private service = inject(TrackService);
  private favorites = inject(FavoritesService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected term = signal('');
  protected favoritesEnabled = environment.features.favorites;
  protected favoriteError = signal(false);

  protected openTrack(id: number): void {
    this.router.navigate(['/tracks', id]);
  }

  private searchResults = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) =>
        this.service.search(query).pipe(
          catchError((error: unknown) => {
            console.error('[TrackSearch] échec de la recherche', error);
            return of([] as Track[]);
          }),
        ),
      ),
    ),
    { initialValue: [] as Track[] },
  );

  // Mirror the search stream into a writable signal so a favorite toggle can
  // patch a single card without re-querying the server.
  protected tracks = signal<Track[]>([]);

  constructor() {
    effect(() => this.tracks.set(this.searchResults()));
  }

  protected onFavoriteToggle(track: Track): void {
    this.favoriteError.set(false);

    const request = track.favorite
      ? this.favorites.remove(track.id)
      : this.favorites.add(track.id);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.setFavorite(track.id, !track.favorite),
      // Only reflect the change on success; otherwise surface the failure.
      error: () => this.favoriteError.set(true),
    });
  }

  private setFavorite(id: number, favorite: boolean): void {
    this.tracks.update((tracks) =>
      tracks.map((track) => (track.id === id ? { ...track, favorite } : track)),
    );
  }
}
