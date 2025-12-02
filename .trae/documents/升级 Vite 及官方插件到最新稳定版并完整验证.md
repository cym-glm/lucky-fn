## 升级范围
- 核心：`vite`（package.json:78）
- 官方插件：`@vitejs/plugin-vue`（package.json:56）、`@vitejs/plugin-legacy`（package.json:55）
- 现用 Vite 生态插件：`vite-plugin-vue-devtools`（package.json:82）、`vite-plugin-inspect`（package.json:80）、`rollup-plugin-visualizer`（package.json:69）、`vite-plugin-compression`（package.json:79）、`vite-plugin-svg-icons`（package.json:81）
- 说明：项目为 Vue3（package.json:32）+ Vite，配置位于 `vite.config.ts`（根目录），插件列表在 `plugins`（vite.config.ts:27–77）

## 目标版本
- Vite：7.2.x（GitHub Releases 显示 v7.2.6，需满足 Node 20.19+ 或 22.12+）[来源：Vite 7 公告]
- @vitejs/plugin-vue：6.0.x [来源：plugin-vue releases]
- @vitejs/plugin-legacy：7.2.x [来源：npm]
- vite-plugin-vue-devtools：8.0.x [来源：npm]
- vite-plugin-inspect：10.x（v6+ 以上兼容）[来源：npm]
- 其他插件按最新稳定版升级（若存在）

## 预检查
- 检查包管理器：根目录无 lockfile，默认按 `npm`
- 检查 Node 版本：确保本机 `node -v` ≥ 20.19（Vite 7 要求）
- 记录当前构建与开发用时、包体大小与警告数量，便于对比

## 升级步骤
- 使用 npm 直接提升级别并重写 semver 范围（避免 `npm update` 受主版本限制）：
  - `npm i -D vite@latest @vitejs/plugin-vue@latest @vitejs/plugin-legacy@latest vite-plugin-vue-devtools@latest vite-plugin-inspect@latest rollup-plugin-visualizer@latest vite-plugin-compression@latest vite-plugin-svg-icons@latest`
- 可选（建议同步）：`npm i -D vitest@latest`（Vite7 支持从 Vitest 3.2 起）
- 执行安装后清理缓存：`rm -rf node_modules/.vite`（如存在）

## 配置调整
- `vite.config.ts` 现状：
  - `base` 与多模式逻辑（vite.config.ts:26）保留，无需改动
  - `legacy` 插件条件启用（vite.config.ts:29–33）兼容 Vite 7；已安装 `terser`（package.json:73），保持 `build.minify: 'terser'`（vite.config.ts:110）
  - `visualizer`（vite.config.ts:42–48）与 `vite-plugin-compression`（vite.config.ts:35–41）可直接沿用
  - `createSvgIconsPlugin`（vite.config.ts:50–55）沿用；已在 `src/icons`（vite.config.ts:52）
  - `AutoImport`/`Components`/`Icons`（vite.config.ts:56–76）沿用
  - `server.proxy`（vite.config.ts:95–102）与 `resolve.alias`（vite.config.ts:104–108）沿用
  - `rollupOptions.output`（vite.config.ts:122–137）沿用
  - `test`（vite.config.ts:139–148）如升级到 Vitest 3，保持 `globals: true` 即可
- Vite 7 变更要点（确认不影响现有配置）：
  - 默认 `build.target` 改为 Baseline Widely Available，无需在本项目显式设置
  - ESM-only 发行，项目 `type: module`（package.json:5）已匹配；`createRequire` 使用不受影响（vite.config.ts:3,18–20）

## 验证与测试
- 开发服务器：
  - `npm run dev`（package.json:8）
  - 访问 `http://localhost:5173`；验证 HMR：修改 `src/views/Home/index.vue` 或 `src/views/Config/index.vue`（如行 9 处 `menuList`），页面应热更新
- 生产构建与预览：
  - `npm run build`（package.json:9）应无错误/警告；生成 `dist`
  - `npm run preview`（package.json:14）验证路由与资源加载，`base` 为 `/log-lottery/`（vite.config.ts:26）
- 预构建（optimizeDeps）：首启观察依赖预构建日志，无异常即通过
- 插件功能：
  - `visualizer` 将自动打开 `test.html`（vite.config.ts:42–48）
  - `vite-plugin-vue-devtools`：如启用（vite.config.ts:15,35），页面可访问 DevTools 面板
  - `vite-plugin-inspect`：升级到 v10 后，可访问 `/__inspect/`（若在 `plugins` 使用时）
  - `vite-plugin-compression`：检查 `dist` 是否生成 `.gz`，符合阈值与算法配置（vite.config.ts:35–41）
- 性能对比：
  - 记录构建用时（`time npm run build`）、产物大小与 chunk 数量（`visualizer`），确保无下降

## 兼容性问题与解决方案
- Node 版本不足：升级至 20.19+（或 22.12+）
- `vite-plugin-inspect` 旧版（0.8.x）在 Vite7：升级到 10.x
- 如 `vite-plugin-compression` 在 Vite7 上出现异常：改用维护中的 `vite-plugin-compression2`，保持同等功能（gzip/brotli）
- 若第三方插件提示不兼容：按官方 README 升级到其标注的 Vite7 兼容版本或替换为等价插件

## 交付标准
- 开发服务器正常启动与 HMR 正常
- `npm run build` 成功且无警告（或解释不可避免的外部警告）
- 所有现用插件的功能保持可用
- 构建性能不下降（用时、产物大小对比不逊于当前）

## 下一步（获得确认后立即执行）
- 执行依赖升级命令并安装
- 逐项跑通“验证与测试”清单
- 如遇不兼容，按“兼容性问题与解决方案”调整并复测
- 输出升级报告（包含版本对比、性能对比与注意事项）