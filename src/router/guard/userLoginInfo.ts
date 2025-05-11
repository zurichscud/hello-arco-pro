import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // 进度条组件

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

/**
 * 用户登录信息守卫
 * 主要功能：
 * 1. 检查用户是否已登录
 * 2. 如果已登录，确保获取用户信息
 * 3. 未登录时重定向到登录页面
 */
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始页面加载进度条
    NProgress.start();
    const userStore = useUserStore();

    // 判断用户是否已登录
    if (isLogin()) {
      // 已登录状态
      if (userStore.role) {
        // 如果已有用户角色信息，直接放行
        next();
      } else {
        try {
          // 尝试获取用户信息
          await userStore.info();
          next();
        } catch (error) {
          // 获取用户信息失败，登出并跳转到登录页
          await userStore.logout();
          next({
            name: 'login',
            query: {
              // 保存原目标路由信息，登录后可以跳回
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      // 未登录状态
      if (to.name === 'login') {
        // 如果要跳转的就是登录页，直接放行
        next();
        return;
      }
      // 跳转到登录页，并携带原目标路由信息
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}
