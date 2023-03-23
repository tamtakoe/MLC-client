import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  @Input() hasOverlay = true;

  ngOnInit() {}
}
