import * as React from 'react';
import {dialogService} from './dialog.service';
import {NavigationContainerRef} from '@react-navigation/native';

class NavigationService {
  private readyToNavigate = false; // Check if the app has mounted

  navigationRef = React.createRef<NavigationContainerRef<any>>();

  setIsReadyNavigation(isReady: boolean) {
    this.readyToNavigate = isReady;
  }

  navigate(name: string, params?: object | undefined) {
    if (this.readyToNavigate && this.navigationRef.current) {
      // Perform navigation if the app has mounted
      this.navigationRef.current.navigate(name, params);
      dialogService.hide();
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
    }
  }

  goBack() {
    this.navigationRef.current?.goBack();
  }

  getRouteParams<T>(): T | object | undefined {
    const routeInfo =
      navigationService.navigationRef.current?.getCurrentRoute();
    return routeInfo?.params;
  }

  setRouteParams(params: object) {
    this.navigationRef.current?.setParams(params);
  }
}

export const navigationService = new NavigationService();
