import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FetchAdminDto } from './dto/fetch-admin-dto';
import { Result } from '@/common/dto/result.dto';

@Controller('admin')
@ApiTags('管理员相关')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: '获取管理员信息' })
  async fetchAdminInfo(@Query() adminInfo: FetchAdminDto) {
    const adminRes = await this.adminService.fetchAdminInfo(adminInfo);
    return new Result<FetchAdminDto[]>().okWithPage(adminRes);
  }

  @Post()
  @ApiOperation({ summary: '新增管理员信息' })
  async createAdmin(@Body() adminInfo: CreateAdminDto) {
    const res = await this.adminService.createAdminInfo(adminInfo);
    return res === true ? new Result().ok() : new Result().error();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
