import { Test, TestingModule } from '@nestjs/testing';
import { InstitucionFinancieraService } from './institucion-financiera.service';

describe('InstitucionFinancieraService', () => {
  let service: InstitucionFinancieraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitucionFinancieraService],
    }).compile();

    service = module.get<InstitucionFinancieraService>(InstitucionFinancieraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
