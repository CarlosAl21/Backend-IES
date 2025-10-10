import { Test, TestingModule } from '@nestjs/testing';
import { SimuladorInversionController } from './simulador-inversion.controller';
import { SimuladorInversionService } from './simulador-inversion.service';

describe('SimuladorInversionController', () => {
  let controller: SimuladorInversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimuladorInversionController],
      providers: [SimuladorInversionService],
    }).compile();

    controller = module.get<SimuladorInversionController>(SimuladorInversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
