import {Component, Inject, OnInit} from '@angular/core';
import {UsersResource} from "./_resources/users.resource";
import {FlashMessage} from "./_services/flash-message";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {skip} from "rxjs";

declare global {
  interface Window {
    Telegram: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private usersResource: UsersResource,
              private flashMessage: FlashMessage,
              private router: Router,
              private route: ActivatedRoute,) {
    console.log('Telegram:', window.Telegram);
    console.log('initData:', window.Telegram.WebApp.initData, 'platform:', window.Telegram.WebApp.platform) //platform == 'unknown'
    // let initDataUnsafe = window?.Telegram?.WebApp?.initDataUnsafe

    // let url = ''
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     url = event.url
    //   }
    // })

    // if (!window?.Telegram?.WebApp?.initData) {
    //   initDataUnsafe = {
    //     "query_id": "AAEhIcYFAAAAACEhxgUPvCsM",
    //     "user": {
    //       // "id": 96870689,
    //       "id": 761307220,
    //       "first_name": "tamtakoe",
    //       "last_name": "",
    //       "username": "tamtakoe",
    //       "language_code": "en"
    //     },
    //     "auth_date": "1679758919",
    //     "hash": "39dc228eae45c26f7cd9ef7da05923f84e68506773f70437f96f6b2a2c0cb3cb"
    //   }
    // }

    // console.log('tgWebAppData:!!!', this.route.snapshot.queryParams['tgWebAppData']);

    this.route.queryParams.pipe(skip(1)).subscribe((params) => {
      // this.flashMessage.info(`${url}`, { description: JSON.stringify(params) })
      console.log('tgWebAppData:', params['tgWebAppData']);

      // const mlcId = Number.parseInt(params['mlcId'])
      //
      // const user = Object.assign({mlcId: mlcId || 1}, initDataUnsafe.user)
      //
      // this.usersResource.authorize(user).catch((error: any) => {
      //   this.flashMessage.error('Auth Error', { description: JSON.stringify(error) })
      // })
    })

    //   "initData": "query_id=AAEhIcYFAAAAACEhxgUPvCsM&user=%7B%22id%22%3A96870689%2C%22first_name%22%3A%22tamtakoe%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22tamtakoe%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1679758919&hash=39dc228eae45c26f7cd9ef7da05923f84e68506773f70437f96f6b2a2c0cb3cb",
  }
}
