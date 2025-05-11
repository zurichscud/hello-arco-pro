import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean; // 是否显示导航栏
  menu: boolean; // 是否显示菜单
  topMenu: boolean; // 是否显示顶部菜单
  hideMenu: boolean; // 是否隐藏菜单
  menuCollapse: boolean; // 是否折叠菜单
  footer: boolean; // 是否显示页脚
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  tabBar: boolean; //多页签
  menuFromServer: boolean;
  serverMenu: RouteRecordNormalized[];
  [key: string]: unknown;
}
