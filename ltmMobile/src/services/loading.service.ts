import {Subject} from 'rxjs';

class LoadingService {
  loadingSubject = new Subject<boolean>();

  open() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}

export const loadingService = new LoadingService();
