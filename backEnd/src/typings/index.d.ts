declare namespace Api {
  namespace Common {
    /**
     * @description: 全局响应体
     */
    type Response<T = any> = {
      code: number; // 状态码
      data?: T; // 业务数据
      msg: string; // 响应信息
    };

    /**
     * @description: 分页数据
     */
    type PageResponse<T = any> = {
      pageNum?: number; // 页码
      pageSize?: number; // 当前页条数
      total?: number; // 总条数
      list: T[]; // 业务数据
    };
  }
}
