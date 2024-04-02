import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-two-column-sidebar',
  templateUrl: './two-column-sidebar.component.html',
  styleUrls: ['./two-column-sidebar.component.scss'],
})
export class TwoColumnSidebarComponent implements OnInit, AfterViewInit {
  public menu: any;
  public toggle: any = true;
  public menuItems: MenuItem[] = [];
  @ViewChild('sideMenu') public sideMenu!: ElementRef;
  @Output() public mobileMenuButtonClicked = new EventEmitter();

  constructor(private _router: Router) {}

  ngOnInit(): void {
    // Menu Items
    this.menuItems = MENU;
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.initActiveMenu();
      }
    });
  }

  /***
   * Activate drop down set
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initActiveMenu();
    }, 0);
  }

  toggleSubItem(event: any): void {
    const isCurrentMenuId = event.target.closest('a.nav-link');
    const isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains('show')) {
      isMenu.classList.remove('show');
      isCurrentMenuId.setAttribute('aria-expanded', 'false');
    } else {
      const dropDowns = Array.from(document.querySelectorAll('.menu-dropdown .show'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });

      const subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
      subDropDowns.forEach((submenu: any) => {
        submenu.setAttribute('aria-expanded', 'false');
      });

      if (event.target && event.target.nextElementSibling) {
        isCurrentMenuId.setAttribute('aria-expanded', 'true');
        event.target.nextElementSibling.classList.toggle('show');
      }
    }
  }

  toggleExtraSubItem(event: any): void {
    const isCurrentMenuId = event.target.closest('a.nav-link');
    const isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains('show')) {
      isMenu.classList.remove('show');
      isCurrentMenuId.setAttribute('aria-expanded', 'false');
    } else {
      const dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });

      const subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
      subDropDowns.forEach((submenu: any) => {
        submenu.setAttribute('aria-expanded', 'false');
      });

      if (event.target && event.target.nextElementSibling) {
        isCurrentMenuId.setAttribute('aria-expanded', 'true');
        event.target.nextElementSibling.classList.toggle('show');
      }
    }
  }

  updateActive(event: any): void {
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link.active'));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  // Click wise Parent active class add
  toggleParentItem(event: any): void {
    const isCurrentMenuId = event.target.getAttribute('subitems');
    const isMenu = document.getElementById(isCurrentMenuId) as any;
    const dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    isMenu ? isMenu.classList.add('show') : null;

    const ul = document.getElementById('two-column-menu');
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName('a'));
      const activeIconItems = iconItems.filter((x: any) => x.classList.contains('active'));
      activeIconItems.forEach((item: any) => {
        item.classList.remove('active');
      });
    }
    event.target.classList.add('active');
    document.body.classList.add('twocolumn-panel');
  }

  toggleItem(event: any): void {
    // show navbar-nav menu on click of icon sidebar menu
    const isCurrentMenuId = event.target.getAttribute('subitems');
    const isMenu = document.getElementById(isCurrentMenuId) as any;
    const dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    isMenu ? isMenu.classList.add('show') : null;

    const ul = document.getElementById('two-column-menu');
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName('a'));
      const activeIconItems = iconItems.filter((x: any) => x.classList.contains('active'));
      activeIconItems.forEach((item: any) => {
        item.classList.remove('active');
      });
    }
    event.target.classList.add('active');
    document.body.classList.remove('twocolumn-panel');
  }

  // remove active items of two-column-menu
  removeActivation(items: any): void {
    items.forEach((item: any) => {
      if (item.classList.contains('menu-link')) {
        if (!item.classList.contains('active')) {
          item.setAttribute('aria-expanded', false);
        }
        item.nextElementSibling.classList.remove('show');
      }
      if (item.classList.contains('nav-link')) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
        if (item.parentElement) {
          item.parentElement.closest('.collapse')?.classList.remove('show');
        }
        item.setAttribute('aria-expanded', false);
      }
      item.classList.remove('active');
    });
  }

  activateIconSidebarActive(id: any): void {
    const menu = document.querySelector(
      "#two-column-menu .simplebar-content-wrapper a[subitems='" + id + "'].nav-icon"
    );
    if (menu !== null) {
      menu.classList.add('active');
    }
  }

  activateParentDropdown(item: any): boolean {
    // navbar-nav menu add active
    item.classList.add('active');
    const parentCollapseDiv = item.closest('.collapse.menu-dropdown');
    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add('show');
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      parentCollapseDiv.parentElement.children[0].setAttribute('aria-expanded', 'true');
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        parentCollapseDiv.parentElement.closest('.collapse').classList.add('show');
        if (parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling)
          parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling.classList.add('active');
      }
      this.activateIconSidebarActive(parentCollapseDiv.getAttribute('id'));
      return false;
    }
    return false;
  }

  initActiveMenu(): void {
    const pathName = window.location.pathname;
    // Active Main Single Menu
    const mainItems = Array.from(document.querySelectorAll('.twocolumn-iconview li a'));
    const matchingMainMenuItem = mainItems.find((x: any) => {
      if (x.classList.contains('active')) {
        x.classList.remove('active');
      }
      return x.pathname === pathName;
    });

    if (matchingMainMenuItem) {
      this.activateParentDropdown(matchingMainMenuItem);
    }

    // Active Sub Menu
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link'));
      const activeItems = items.filter((x: any) => x.classList.contains('active'));
      this.removeActivation(activeItems);

      const matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });

      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      } else {
        const id = pathName.replace('/', '');
        if (id) document.body.classList.add('twocolumn-panel');
        this.activateIconSidebarActive(id);
      }
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem): boolean {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide(): void {
    document.body.classList.remove('vertical-sidebar-enable');
  }
}
