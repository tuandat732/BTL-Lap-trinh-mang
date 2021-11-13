import {dialogService} from './dialog.service';
import {loadingService} from './loading.service';

class ErrorHandler {
  public handle(error: any) {
    console.log('error nef', error);
    loadingService.hide();
    dialogService.showError(error?.response?.message || 'Có lỗi xảy ra');
  }
}

export const errorHandler = new ErrorHandler();
