import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Suggested } from 'src/suggested/entity/suggested';
import { CreateSuggested } from 'src/suggested/input/create-suggested';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MinRole } from 'src/auth/decorator/roles.';
import { Role } from 'src/user/enum/role';
import { Id } from 'src/shared/decorator/id';

@Controller('suggested')
export class SuggestedController {

  @MinRole(Role.User)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async createBook(@Body() body: CreateSuggested, @Req() req): Promise<Suggested> {
    console.log(req);
    body.suggester = req.user;
    return Suggested.create(body).save();
  }

  @Get(':id')
  async getSuggested(@Id() id: number): Promise<Suggested> {
    return Suggested.findOne({ id });
  }

  @Get()
  async getSuggesteds(): Promise<Suggested[]> {
    return Suggested.find({ relations: ['suggester'] });
  }
}
