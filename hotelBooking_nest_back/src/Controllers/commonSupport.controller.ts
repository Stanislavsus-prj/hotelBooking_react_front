import { Controller, Post, Param, Get, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common'
import { Response } from 'express';
import { RolesGuard } from '../Decorators/roles.decorator';
import { Role } from '../Decorators/setmetadata.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SupportProvider } from '../Providers/support.provider'

@Controller('/api/common/support-requests')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class CommonSupportController {
  constructor(private support: SupportProvider) {}

  @Role('manager', 'client')
  @Post('/:id/messages/read')
  async messagesRead(@Param('id') id, @Res() res: Response): Promise<void> {
    await this.support.messagesRead(id);
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Role('manager', 'client')
  @Get('/:id/messages')
  async getHistory(@Param('id') id, @Req() req, @Res() res: Response): Promise<void> {
    const history = await this.support.getHistory(id, req.user);
    res.status(HttpStatus.OK).send(history);
  }
}