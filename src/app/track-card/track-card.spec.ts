import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Track } from '../models/track';

import { TrackCard } from './track-card';

const track: Track = {
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
};

describe('TrackCard', () => {
  let component: TrackCard;
  let fixture: ComponentFixture<TrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', track);
    fixture.componentRef.setInput('favoriteEnabled', true);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits select when the Voir action is clicked', () => {
    let selected: Track | undefined;
    component.select.subscribe((value) => (selected = value));

    (fixture.nativeElement.querySelector('.view') as HTMLButtonElement).click();

    expect(selected).toEqual(track);
  });

  it('emits favoriteToggled (and not select) when the favorite action is clicked', () => {
    let toggled: Track | undefined;
    let selected = false;
    component.favoriteToggled.subscribe((value) => (toggled = value));
    component.select.subscribe(() => (selected = true));

    (fixture.nativeElement.querySelector('.favorite') as HTMLButtonElement).click();

    expect(toggled).toEqual(track);
    expect(selected).toBe(false);
  });

  it('hides the favorite action when the feature is disabled', () => {
    fixture.componentRef.setInput('favoriteEnabled', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.favorite')).toBeNull();
  });
});
