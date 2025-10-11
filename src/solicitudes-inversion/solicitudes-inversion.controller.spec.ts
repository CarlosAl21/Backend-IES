import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesInversionController } from './solicitudes-inversion.controller';
import { SolicitudesInversionService } from './solicitudes-inversion.service';

describe('SolicitudesInversionController', () => {
  let controller: SolicitudesInversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudesInversionController],
      providers: [SolicitudesInversionService],
    }).compile();

    controller = module.get<SolicitudesInversionController>(SolicitudesInversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
