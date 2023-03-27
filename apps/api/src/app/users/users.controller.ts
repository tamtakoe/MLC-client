import {Body, Controller, Delete, Get, Param, Post, Put, Query, Res} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { config } from "../../environments/environment";
import {BackendService} from "../_services/backend.service";
import {AuthService} from "../_services/auth.service";

@Controller('api')
export class UsersController {
  constructor(private readonly backendService: BackendService, private authService: AuthService) {}

  @Get('users/current/token')
  getUserToken(@Query('telegramId') telegramId: number) {
    return this.authService.getUserToken(telegramId)
  }

  @Post('users/current/authorize')
  authorizeUser(@Body() user, @Res({ passthrough: true }) res) {
    return this.authService.getUserToken(user.id)
        .then(auth => {
          console.log('++++++ setCookie: authToken=', auth.token);
          res.cookie('authToken', auth.token, { maxAge: 900000, httpOnly: true, sameSite: 'strict', secure: true });
          // res.cookie('authToken', auth.token);
          // res.send(auth)
          return auth
        })
  }
}
// {
//   "id": 7,
//   "token": "aM+t8dCxB6DYalIptWBrVeg246Ym562oSuxSFjK8npYj2c9N8+TMiwkX/LSDpmsLHzZtUw9yEk5hwnwHX4rsukC6qTlFVmkna7vhe5XdDkKvMgRlm44jUsXk5oDlz+PX",
//   "expiration": 1679962428
// }
