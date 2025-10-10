import { Test, TestingModule } from '@nestjs/testing';
import { InversionesActivasService } from './inversiones-activas.service';

describe('InversionesActivasService', () => {
  let service: InversionesActivasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InversionesActivasService],
    }).compile();

    service = module.get<InversionesActivasService>(InversionesActivasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
