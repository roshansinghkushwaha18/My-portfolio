import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { pathToFileURL } from 'url';

// Middleware to mock /api/* serverless routes during local development
function aiDevMiddleware() {
  return {
    name: 'ai-dev-middleware',
    configureServer(server) {
      const handleApi = (route, relativeHandlerPath) => {
        server.middlewares.use(route, async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body || '{}');
                const absolutePath = path.resolve(process.cwd(), relativeHandlerPath);
                const module = await import(`${pathToFileURL(absolutePath).href}?t=${Date.now()}`);
                const customRes = {
                  status: (code) => {
                    res.statusCode = code;
                    return customRes;
                  },
                  json: (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  }
                };
                await module.default(req, customRes);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        });
      };

      handleApi('/api/chat', 'api/chat.js');
      handleApi('/api/marketing-tools', 'api/marketing-tools.js');
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/My-portfolio/',
  plugins: [react(), aiDevMiddleware()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'motion-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui-icons';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1200,
  }
});
