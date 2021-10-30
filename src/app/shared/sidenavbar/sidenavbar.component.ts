import { Component, OnInit } from '@angular/core';
import { SideNavbarModel } from './sidenavbar.model';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: 'sidenavbar.component.html',
  styleUrls: ['sidenavbar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  /**
   * Navbar Contents have been created dynamically
   * Defining New option in the below array in the same structure, will new add option in sidenabar
   */
  navbarContents: SideNavbarModel[] = [
    // Commenting out below menu option for time being
    // {
    //   option: 'Home',
    //   routePath: '/admin/home',
    //   iconPath: '../../../assets/home.svg'
    // },
    {
      option: 'Assessments',
      routePath: '/admin/assessments',
      iconPath: '../../../assets/assesment.svg'
    },
    {
      option: 'Schedule',
      routePath: '/admin/schedule',
      iconPath: '../../../assets/schedule-icon.svg'
    },
    {
      option: 'Sync',
      routePath: '/admin/sync',
      iconPath: '../../../assets/images/sync_black_24dp.svg'
    },
    {
      option: 'Force logout',
      routePath: '/admin/logout',
      iconPath: '../../../assets/images/sync_black_24dp.svg'
    },
    {
      option: 'Questions Master',
      routePath: '/admin/Questions',
      iconPath: '../../../assets/images/sync_black_24dp.svg'
    }
  ];
  constructor() {}
  ngOnInit(): void {}
}
