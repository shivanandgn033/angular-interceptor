import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = 'your-jwt-token'; // Replace with your token logic
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Intercepted HTTP request:', authReq);

  return next(authReq);
};
