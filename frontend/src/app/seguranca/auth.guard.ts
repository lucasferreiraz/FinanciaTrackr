import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (route.data?.['roles'] && !authService.temQualquerPermissao(route.data?.['roles'])) {
    router.navigate(['/nao-autorizado']);
    return false;
  }
  return true;
};
