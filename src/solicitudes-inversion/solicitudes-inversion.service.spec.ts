import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesInversionService } from './solicitudes-inversion.service';

describe('SolicitudesInversionService', () => {
  let service: SolicitudesInversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudesInversionService],
    }).compile();

    service = module.get<SolicitudesInversionService>(SolicitudesInversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
