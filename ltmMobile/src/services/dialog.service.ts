import {Alert, AlertButton} from 'react-native';
import {Subject} from 'rxjs';

interface ConfirmCallback {
  yes?: () => void;
  no?: () => void;
}

interface ConfirmOption {
  title?: string;
  message?: string;
}

export type DialogData = {[key: string]: any} & {
  onClose?: () => void;
  title?: string;
};

export class DialogService {
  private isOpen = new Subject<any>();
  isOpen$ = this.isOpen.asObservable();
  dialogContent: React.ComponentClass<any> | null = null;
  dialogData: DialogData = {};

  show() {
    this.isOpen.next(true);
  }

  hide() {
    this.isOpen.next(false);
  }

  open(component: React.ComponentClass<any>, props: DialogData) {
    this.dialogContent = component;
    this.dialogData = props;
    this.show();
  }

  confirm(option: ConfirmOption, callback?: ConfirmCallback) {
    this.showAlert(option.title, option.message, [
      {
        text: 'No',
        onPress: callback?.no,
      },
      {
        text: 'Yes',
        onPress: callback?.yes,
      },
    ]);
  }

  alert(message: string, onPressOK?: () => void, labelOK?: string) {
    this.showAlert('', message, [
      {
        text: labelOK || 'Ok',
        onPress: onPressOK,
      },
    ]);
  }

  showError(error: string, onClose?: () => void) {
    const errorMessage = error || 'Có lỗi xảy ra';
    this.alert(errorMessage, onClose);
  }

  private showAlert(title?: string, message?: string, buttons?: AlertButton[]) {
    Alert.alert(title || '', message, buttons);
  }
}

export const dialogService = new DialogService();
