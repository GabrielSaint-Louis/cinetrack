import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { TrackList } from '../track-list/track-list';

@Component({
  selector: 'app-track-search',
  imports: [TrackList],
  templateUrl: './track-search.html',
  styleUrl: './track-search.css',
})
export class TrackSearch {
  private service = inject(TrackService);
  private router = inject(Router);
  protected term = signal('');

  protected openTrack(id: number): void {
    this.router.navigate(['/tracks', id]);
  }

  protected results = toSignal(
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
}
