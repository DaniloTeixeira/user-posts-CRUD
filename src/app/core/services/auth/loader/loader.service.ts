import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderText$ = new BehaviorSubject<string>('');
  showLoader$!: Observable<boolean>;

  private openedLoaders$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.showLoader$ = this.openedLoaders$.pipe(map((n) => n.length > 0));
  }

  show(loaderText: string): void {
    this.loaderText$.next(loaderText ?? '');
    this.openedLoaders$.next([...this.openedLoaders$.getValue(), loaderText]);
  }

  hide(): void {
    const [, ...loaders] = this.openedLoaders$.getValue();
    this.openedLoaders$.next(loaders);
  }
}
