import { Test, TestingModule } from '@nestjs/testing';
import { TipoInversionController } from './tipo-inversion.controller';
import { TipoInversionService } from './tipo-inversion.service';

describe('TipoInversionController', () => {
  let controller: TipoInversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoInversionController],
      providers: [TipoInversionService],
    }).compile();

    controller = module.get<TipoInversionController>(TipoInversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
