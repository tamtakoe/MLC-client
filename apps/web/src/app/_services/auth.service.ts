import {Injectable} from '@angular/core';
import {UsersResource} from "../_resources/users.resource";
import {FlashMessage} from "./flash-message";

let initDataUnsafe = window?.Telegram?.WebApp?.initDataUnsafe

if (!window?.Telegram?.WebApp?.initData) {
    initDataUnsafe = {
        "query_id": "AAEhIcYFAAAAACEhxgUPvCsM",
        "user": {
            // "id": 96870689,
            "id": 761307220,
            "first_name": "tamtakoe",
            "last_name": "",
            "username": "tamtakoe",
            "language_code": "en"
        },
        "auth_date": "1679758919",
        "hash": "39dc228eae45c26f7cd9ef7da05923f84e68506773f70437f96f6b2a2c0cb3cb"
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: any;

    constructor(private usersResource: UsersResource, private flashMessage: FlashMessage) {
        const params: any = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop as string),
        });
        const mlcId = Number.parseInt(params['mlcId'])

        this.user = Object.assign({mlcId: mlcId || 1}, initDataUnsafe.user)
    }

    // Authorize and set cookie
    authorize() {
        return this.usersResource.authorize(this.user).catch((error: any) => {
            this.flashMessage.error('Auth Error', { description: JSON.stringify(error) })
        })
    }
}
