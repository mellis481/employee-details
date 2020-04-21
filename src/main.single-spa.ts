import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import {
  getSingleSpaExtraProviders,
  singleSpaAngular,
} from 'single-spa-angular';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  domElementGetter,
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: '<employee-details-root />',
  Router,
  NgZone,
});

function domElementGetter() {
  let el = document.getElementById('mf-content');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mf-demo-employee-details';
    document.body.appendChild(el);
  }
  return el;
}

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
