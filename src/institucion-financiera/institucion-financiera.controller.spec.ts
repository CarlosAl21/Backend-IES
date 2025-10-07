import { Test, TestingModule } from '@nestjs/testing';
import { InstitucionFinancieraController } from './institucion-financiera.controller';
import { InstitucionFinancieraService } from './institucion-financiera.service';

describe('InstitucionFinancieraController', () => {
  let controller: InstitucionFinancieraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitucionFinancieraController],
      providers: [InstitucionFinancieraService],
    }).compile();

    controller = module.get<InstitucionFinancieraController>(InstitucionFinancieraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
