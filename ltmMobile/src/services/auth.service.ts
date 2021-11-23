import {BehaviorSubject, distinctUntilChanged, map, Observable} from 'rxjs';
import {IResponse} from '../interfaces';
import {User} from '../models';
import {apiService} from './api.service';
import {storageService} from './storage.service';

class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(
    null as unknown as User,
  );
  public currentUser: Observable<User> = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  async getMe() {
    const token = await storageService.getToken();
    if (!token) {
      return this.removeAuth();
    }
    apiService.setAuthHeader(token as string);
    apiService.get('/auth/getMe').subscribe(
      async res => {
        console.log('dasdsa', res);
        await this.setAuth(new User(res.data));
      },
      _ => this.removeAuth(),
    );
  }

  async setAuth(user: User) {
    if (user.lastToken) {
      await storageService.saveToken(user.lastToken);
    }
    this.currentUserSubject.next(user);
  }

  async removeAuth() {
    await storageService.destroyToken();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  logOut() {
    this.removeAuth();
  }

  postLogin(user: any): Observable<IResponse> {
    return apiService.post('/auth/login-user', {body: user}).pipe(
      map(res => {
        console.log('ressposne nef', res);
        return res;
      }),
    );
  }

  postRegister(user: any): Observable<IResponse> {
    return apiService.post('/auth', {body: user});
  }
}

export const authService = new AuthService();
