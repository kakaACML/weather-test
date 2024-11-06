import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' 利用babel编译
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  
  let option = {}

  if (command === 'serve') {
    option= {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    option= {
      // build 独有配置
    }
  }


  const defaultConfig = {
    path:'',
    plugins: [react()],
    resolve: {
      alias: {
        "@":path.resolve(__dirname, './src')  // 配置别名
      }
    }
  }

  return {...option,...defaultConfig}
})
