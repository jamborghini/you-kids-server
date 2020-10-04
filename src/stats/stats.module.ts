import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { Stats } from './entity/stats';

@Module({
    imports: [TypeOrmModule.forFeature([Stats]), HttpModule],
    providers:[StatsService],
    exports:[StatsService]
})
export class StatsModule {}
