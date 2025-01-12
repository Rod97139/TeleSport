import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-subtitle',
  standalone: true,
  imports: [],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.scss'
})
export class SubtitleComponent {
  @Input() subtitle: string | undefined;
  @Input ({transform: numberAttribute}) count!: number;
}
