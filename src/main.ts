import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TestCompComponent } from './test-comp/test-comp.component';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TestCompComponent],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <app-test-comp/>
    
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
