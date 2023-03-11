export class Result<T> {
  // 状态码
  code: number;

  // 请求结果信息
  message: string;

  // 是否成功
  success: boolean;

  // 页数
  total: number;

  // 数据
  data: T;

  ok(data = null, message = 'success') {
    this.code = 0;
    this.data = data;
    this.message = message;
    return this;
  }

  error(code = 1, message = 'error') {
    this.code = code;
    this.message = message;
    return this;
  }

  okWithPage(data = null) {
    this.code = 0;
    this.data = data[0];
    this.message = 'success';
    this.total = data[1] || 0;
    return this;
  }
}
