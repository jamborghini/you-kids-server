import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Suggested } from 'src/suggested/entity/suggested';
import { CreateSuggested } from 'src/suggested/input/create-suggested';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MinRole } from 'src/auth/decorator/roles.';
import { Role } from 'src/user/enum/role';

@Controller('suggested')
export class SuggestedController {

  @MinRole(Role.User)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async createSuggestion(@Body() body: CreateSuggested, @Req() req): Promise<Suggested> {
    console.log(req);
    body.suggester = req.user;
    return Suggested.create(body).save();
  }


  @Get()
  async getSuggesteds(): Promise<Suggested[]> {
    return Suggested.find();
  }
}
