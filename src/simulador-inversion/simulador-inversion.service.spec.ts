import { Test, TestingModule } from '@nestjs/testing';
import { SimuladorInversionService } from './simulador-inversion.service';

describe('SimuladorInversionService', () => {
  let service: SimuladorInversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimuladorInversionService],
    }).compile();

    service = module.get<SimuladorInversionService>(SimuladorInversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
