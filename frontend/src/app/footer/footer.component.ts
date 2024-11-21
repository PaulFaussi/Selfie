import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
  <footer>
    <div class="footer-container">
        <div class="footer-links">
            <a href="">
                <h2>Calendar</h2>
            </a>
            <a href="">
                <h2>Notes</h2>
            </a>
            <a href="">
                <h2>Pomos</h2>
            </a>
        </div>
        
        <div class="footer-decor">
            <h2 style="font-size: 2rem;">Selfie.</h2>
            <p style="color: rgb(229, 229, 229); font-size: 0.5rem;">2024 © Unibo - All rights reserved</p>
        </div>
    </div>
  </footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
