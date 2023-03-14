import { Test } from '@nestjs/testing';

import { MenuService } from './app.service';

describe('AppService', () => {
  let service: MenuService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MenuService],
    }).compile();

    service = app.get<MenuService>(MenuService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
