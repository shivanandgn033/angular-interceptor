In Angular, an interceptor is a powerful tool that allows you to intercept and modify HTTP requests or responses before they are sent to or received from the server. Interceptors are implemented using the HttpInterceptor interface.

Here’s a simple example of creating an HTTP interceptor in Angular 19:

# Steps to Create an Interceptor

# 1 Generate the Interceptor:

bash
```bash
ng generate interceptor auth
```
This will create auth.interceptor.ts.

 Implement the Interceptor Logic: Modify the generated auth.interceptor.ts to include custom logic.

Example: AuthInterceptor
This example adds an Authorization header to every outgoing HTTP request.

auth.interceptor.ts


```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the Authorization header
    const token = 'your-jwt-token'; // Replace with your token logic
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Intercepted HTTP request:', authReq);

    // Pass the cloned request instead of the original
    return next.handle(authReq);
  }
}
```

# 2 Register the Interceptor
Update the app.config.ts file to include the interceptor.

app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([AuthInterceptor]) // Register the interceptor here
    )
  ]
};
```

# 3 Test the Interceptor

Make an HTTP request to see the interceptor in action.

example.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://api.example.com/data');
  }
}
```

app.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-root',
  template: `<h1>Check the Console for Intercepted Request</h1>`
})
export class AppComponent implements OnInit {
  constructor(private exampleService: ExampleService) {}

  ngOnInit() {
    this.exampleService.getData().subscribe(data => {
      console.log('Received data:', data);
    });
  }
}
```
Output in Console
You will see:

The intercepted request logged by auth.interceptor.ts.
The server's response logged by the component.
