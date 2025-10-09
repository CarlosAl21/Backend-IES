import { Test, TestingModule } from '@nestjs/testing';
import { TipoInversionService } from './tipo-inversion.service';

describe('TipoInversionService', () => {
  let service: TipoInversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoInversionService],
    }).compile();

    service = module.get<TipoInversionService>(TipoInversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
