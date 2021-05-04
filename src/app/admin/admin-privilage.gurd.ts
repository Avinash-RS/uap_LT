import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectUserProfileData } from '../redux/user/user.reducer';
import { UserMetaData } from '../rest-api/user-api/models/user-profile.model';

@Injectable()
export class AdminPrivilegeGuard implements CanActivate {
  private userProfile$: Observable<UserMetaData>;
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    this.userProfile$ = this.store.select(selectUserProfileData);
      if(route.routeConfig?.path === 'assessments'){
        if(this.hasPermission('VPK')){
            return true;
        }
        this.router.navigateByUrl('/unauthorized');
      } else if(route.routeConfig?.path === 'schedule'){
        if(this.hasPermission('VSH')){
            return true;
        }
        this.router.navigateByUrl('/unauthorized');
      } else {
          if(this.hasPermission('VPK')){
            this.router.navigateByUrl('/admin/assessments')
          }else if(this.hasPermission('VSH')){
            this.router.navigateByUrl('/admin/schedule')
          }else{
            this.router.navigateByUrl('/unauthorized');
          }
      }
      return false;
    
  }

  hasPermission(permissionToCheck:string): boolean {
    let permissions : Set<string> = new Set();
    this.userProfile$.pipe().forEach(userData => {
        userData.attributes.organisations.forEach(org => {
            if(org.roles){
                org.roles.forEach(role => {
                    if(role.permissions){
                        role.permissions.forEach(permision => {
                            permissions.add(permision.code);
                        })
                    }
                })
            }
            
        })
    })
    return permissions.has(permissionToCheck);
  }
}
