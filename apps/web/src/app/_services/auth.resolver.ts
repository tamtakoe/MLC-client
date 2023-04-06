import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {UsersResource} from "../_resources/users.resource";
import {FlashMessage} from "./flash-message";

// Route example
// { path: 'order',   component: OrderComponent, resolve: { auth: authResolver } },

export const authResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
    const usersResource = inject(UsersResource);
    const flashMessage = inject(FlashMessage)

    let initDataUnsafe = window?.Telegram?.WebApp?.initDataUnsafe

    if (!window?.Telegram?.WebApp?.initData) {
        initDataUnsafe = {
            "query_id": "AAEhIcYFAAAAACEhxgUPvCsM",
            "user": {
                "id": 96870689,
                // "id": 761307220,
                "first_name": "tamtakoe",
                "last_name": "",
                "username": "tamtakoe",
                "language_code": "en"
            },
            "auth_date": "1679758919",
            "hash": "39dc228eae45c26f7cd9ef7da05923f84e68506773f70437f96f6b2a2c0cb3cb"
        }
    }

    const params = route.queryParams
    const mlcId = Number.parseInt(params['mlcId'])

    const user = Object.assign({mlcId: mlcId || 1}, initDataUnsafe.user)

    // Authorize and set cookie
    return usersResource.authorize(user).catch((error: any) => {
        flashMessage.error('Auth Error', { description: JSON.stringify(error) })
    })
};
