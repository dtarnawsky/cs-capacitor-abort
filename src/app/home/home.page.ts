import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  controller: AbortController;
  downloading: boolean;
  constructor() { }

  async download() {
    try {
      this.controller = new AbortController();
      const url = 'https://samplefile.netlify.app/sample.pdf';
      this.downloading = true;
      setTimeout(() => {
        this.controller.abort('Testing abort');
        console.log('Abort was called');
      }, 50);
      const response: Response = await fetch(url, {
        signal: this.controller.signal, cache: 'no-store'
      });

      this.downloading = false;
      console.log(response);
      alert(`Aborted = ${this.controller.signal.aborted}`);
    } catch (err) {
      this.downloading = false;
      alert('Error:'+err);
    }
  }

  abort() {
    this.controller.abort();
  }

}
