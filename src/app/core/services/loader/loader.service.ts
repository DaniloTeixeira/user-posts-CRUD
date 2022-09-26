import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderText$ = new BehaviorSubject<string>('');
  showLoader$!: Observable<boolean>;

  private openedLoader$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.showLoader$ = this.openedLoader$.pipe(map((n) => n.length > 0));
  }

  show(loaderText: string): void {
    this.loaderText$.next(loaderText);
    this.openedLoader$.next([...this.openedLoader$.getValue(), loaderText]);
  }

  hide(): void {
    const [, ...loaders] = this.openedLoader$.getValue();
    this.openedLoader$.next(loaders);
  }
}
