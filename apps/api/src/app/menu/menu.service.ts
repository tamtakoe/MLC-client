import { Injectable } from '@nestjs/common';
import { Message } from '@app/api-interfaces';

@Injectable()
export class MenuService {
  getMenu() {
    return [{
      id: 1,
      name: 'Закуски',
      products: [{
        id: 1,
        name: 'Бургер',
        imageS: 'burger.jpeg',
        price: 420,
        amount: 0
      },{
        id: 5,
        name: 'Пончик',
        imageS: 'donut.jpeg',
        price: 70,
        amount: 0
      },{
        id: 7,
        name: 'Картоха',
        imageS: 'fries.jpeg',
        price: 100,
        amount: 0
      },{
        id: 8,
        name: 'Горячая собака',
        imageS: 'hotdog.jpeg',
        price: 290,
        amount: 0
      },{
        id: 10,
        name: 'Пицца',
        imageS: 'pizza.webp',
        price: 310,
        amount: 0
      },{
        id: 11,
        name: 'Попкорн',
        imageS: 'popcorn.jpeg',
        price: 200,
        amount: 0
      },{
        id: 12,
        name: 'Тако',
        imageS: 'tako.jpeg',
        price: 260,
        amount: 0
      }]
    }, {
      id: 2,
      name: 'Десерты',
      items: [{
        id: 9,
        name: 'Мороженное',
        imageS: 'icecream.jpeg',
        price: 160,
        amount: 0
      },{
        id: 6,
        name: 'Пирожное',
        imageS: 'flan.jpeg',
        price: 190,
        amount: 0
      },{
        id: 2,
        name: 'Чизкейк',
        imageS: 'cake.jpeg',
        price: 200,
        amount: 0
      },{
        id: 4,
        name: 'Печенька',
        imageS: 'cookie.webp',
        price: 80,
        amount: 0
      }]
    }, {
      id: 3,
      name: 'Напитки',
      items: [{
        id: 3,
        name: 'Кола',
        imageS: 'coke.jpeg',
        price: 100,
        amount: 0
      }]
    },{
      id: 4,
      name: 'Напитки2',
      items: [{
        id: 3,
        name: 'Кола',
        imageS: 'coke.jpeg',
        price: 90,
        amount: 0
      }]
    },{
      id: 5,
      name: 'Напитки3',
      items: [{
        id: 3,
        name: 'Кола',
        imageS: 'coke.jpeg',
        price: 110,
        amount: 0
      }]
    }, {
      id: 6,
      name: 'Напитки4',
      items: [{
        id: 3,
        name: 'Кола',
        imageS: 'coke.jpeg',
        price: 120,
        amount: 0
      }]
    }];
  }
}
