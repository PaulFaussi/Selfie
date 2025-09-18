import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
  <footer>

    <div class="footer-links">
        <a href="/calendar">
            <h2 id="link">Calendar</h2>
        </a>
        <a href="/notes">
            <h2 id="link">Notes</h2>
        </a>
        <a href="/pomodoro">
            <h2 id="link">Pomos</h2>
        </a>
    </div>
    
    <div class="footer-decor">
        <h2 id="link" style="font-size: 2rem;">Selfie.</h2>
        <p style="color: rgb(229, 229, 229); margin:0; padding: 0; font-size: 0.5rem;">2024 © Unibo - All rights reserved</p>
    </div>
    
  </footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
