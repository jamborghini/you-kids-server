import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedController } from './suggested.controller';

describe('SuggestedController', () => {
  let controller: SuggestedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestedController],
    }).compile();

    controller = module.get<SuggestedController>(SuggestedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
