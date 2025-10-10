import { Test, TestingModule } from '@nestjs/testing';
import { InversionesActivasController } from './inversiones-activas.controller';
import { InversionesActivasService } from './inversiones-activas.service';

describe('InversionesActivasController', () => {
  let controller: InversionesActivasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InversionesActivasController],
      providers: [InversionesActivasService],
    }).compile();

    controller = module.get<InversionesActivasController>(InversionesActivasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
