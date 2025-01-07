import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-interceptor';
constructor(private exampleService: ExampleService){}
ngOnInit()
{
  this.exampleService.getData().subscribe((data:any) => {
    console.log('Received data:', data);
  });

}

}
