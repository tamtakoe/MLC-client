import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent implements OnInit {

  emptyGroup = {
    name: '',
    products: []
  }
  emptyProduct = {
    name: '',
    photoLinks: '/',
    price: 0
  }
  menu: any[] = []

  isCollapsed = false

  constructor() {
    this.addEmptyGroup(this.menu);
    this.addEmptyProduct(this.menu[this.menu.length - 1].products)
  }

  ngOnInit(): void {
  }

  addEmptyGroup(groups: any[]) {
    groups.push(Object.assign({}, this.emptyGroup))

    return groups
  }

  addEmptyProduct(products: any[]) {
    products.push(Object.assign({}, this.emptyProduct))

    return products
  }

}
