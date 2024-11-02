import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

const _HttpModule = HttpModule.register({
  timeout: 5000,
  maxRedirects: 5,
});

// 全局模块
@Global()
@Module({
  imports: [_HttpModule],
  exports: [_HttpModule],
})
export class CommonModule {}
