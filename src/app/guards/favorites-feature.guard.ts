import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';

export const favoritesFeatureGuard: CanActivateFn = () => {
  const router = inject(Router);
  return environment.features.favorites ? true : router.createUrlTree(['/tracks']);
};
