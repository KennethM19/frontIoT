import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const isLoginRoute = route.routeConfig?.path === 'login';

  if (isAuthenticated && isLoginRoute) {
    router.navigate(['/dashboard']);
    return false;
  }

  if (!isAuthenticated && !isLoginRoute) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
