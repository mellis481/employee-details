import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  SingleSpaProps,
  singleSpaPropsSubject,
} from 'src/single-spa/single-spa-props';

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'employee-details-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  employee: Employee | undefined;
  singleSpaProps: SingleSpaProps = null;
  subscription: Subscription = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      (props) => (this.singleSpaProps = props)
    );

    // TODO: resolve the ID from the route rather than window.location
    // const id = this.route.snapshot.paramMap.get('id');
    const id = window.location.pathname.substr(
      window.location.pathname.lastIndexOf('/') + 1
    );
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      (response) => {
        response.json().then((data) => (this.employee = data));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
