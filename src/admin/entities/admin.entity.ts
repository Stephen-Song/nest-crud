import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AdminPermissionType } from '../type';

@Entity('admin')
export class Admin {
  // 主键
  // 管理员id
  @PrimaryGeneratedColumn()
  adminId: string;

  // 姓名
  @Column()
  name: string;

  // 密码
  @Column()
  password: string;

  // 校区
  @Column()
  campus: string;

  // 手机号码
  @Column()
  phone: number;

  // 邮箱
  @Column()
  mail: string;

  // 权限等级
  @Column({
    default: AdminPermissionType.NORMAL_ADMIN,
  })
  permission: number;

  // 权限是否开启
  @Column()
  status: number;
}
