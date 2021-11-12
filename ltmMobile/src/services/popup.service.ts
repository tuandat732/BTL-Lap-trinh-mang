import {Subject} from 'rxjs';

export interface PopupPropData {
  title: string;
  [key: string]: any;
}

export class PopupService {
  private isOpen = new Subject<any>();
  isOpen$ = this.isOpen.asObservable();
  popupContent: React.ComponentClass<any> | null = null;
  popupPropData: PopupPropData = {
    title: '',
  };

  show() {
    this.isOpen.next(true);
  }

  hide() {
    this.isOpen.next(false);
  }

  open(component: React.ComponentClass<any>, props: PopupPropData) {
    this.popupContent = component;
    this.popupPropData = props;
    this.show();
  }
}
