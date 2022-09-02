import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa';
  isOnline: boolean = false;
  modalVersion: boolean = false;

  constructor(private swUpdate: SwUpdate) { }

  public ngOnInit(): void {
    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      // console.log('swUpdate isEnabled', this.swUpdate.isEnabled);
      /* this.swUpdate.versionUpdates.pipe(
        filter((evt: any): evt is VersionReadyEvent => {
          evt.type === 'VERSION_READY'
          switch (evt.type) {
            case 'VERSION_DETECTED':
              console.log(`Downloading new app version: ${evt.version.hash}`);
              break;
            case 'VERSION_READY':
              console.log(`Current app version: ${evt.currentVersion.hash}`);
              console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
              break;
            case 'VERSION_INSTALLATION_FAILED':
              console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
              break;
          }
          return true;
        }),
        map((evt: any) => {
          console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        }),
      ); */

      /* this.swUpdate.available.subscribe(event => {
        console.log('swUpdate.available: ', event);
        this.modalVersion = true;
      }); */

      // const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      //   filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      //   map(evt => ({
      //     type: 'UPDATE_AVAILABLE',
      //     current: evt.currentVersion,
      //     available: evt.latestVersion,
      //   })));
      const updatesAvailable = this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map((evt: any) => {
          console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        })
      );
    }
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

}
