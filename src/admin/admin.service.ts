import { DEFAULT_PAGESIZE, DEFAULT_SKIP } from '@/common/const';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { FetchAdminDto } from './dto/fetch-admin-dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { v4 } from 'uuid';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  fetchAdminInfo(fetchAdminInfo: FetchAdminDto) {
    // 分页信息
    const { current, pageSize } = fetchAdminInfo;
    // 管理员信息
    const { name, campus, permission, phone, status, mail } = fetchAdminInfo;
    const list = this.adminRepository.findAndCount({
      select: [
        'name',
        'campus',
        'permission',
        'phone',
        'status',
        'mail',
        'adminId',
      ],
      skip: (current < 1 ? 0 : current - 1) * pageSize || DEFAULT_SKIP,
      take: pageSize || DEFAULT_PAGESIZE,
      where: {
        name,
        campus,
        permission,
        phone,
        status,
        mail,
      },
    });
    return list;
  }

  async createAdminInfo(adminInfo: CreateAdminDto) {
    try {
      await this.adminRepository.save({
        ...adminInfo,
        adminId: v4(),
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateAdminInfo: UpdateAdminDto) {
    console.log('shm id', id, updateAdminInfo);
    const originAdminInfo = await this.adminRepository.findOne({
      where: { adminId: id },
    });
    if (!originAdminInfo) {
      return false;
    }
    const mergedAdminInfo = this.adminRepository.merge(
      originAdminInfo,
      updateAdminInfo,
    );

    this.adminRepository.save(mergedAdminInfo);
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
