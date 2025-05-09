/**
 * 路由监听器工具
 * 使用发布订阅模式来管理路由变化的监听，避免直接监听路由带来的性能损耗
 * 通过 mitt 事件总线来实现事件的发布和订阅
 */
import mitt, { Handler } from 'mitt';
import type { RouteLocationNormalized } from 'vue-router';

// 创建事件发射器实例
const emitter = mitt();

// 使用 Symbol 创建唯一的事件 key，避免命名冲突
const key = Symbol('ROUTE_CHANGE');

// 存储最新的路由信息
let latestRoute: RouteLocationNormalized;

/**
 * 设置路由事件发射器
 * @param to - 目标路由信息
 * 当路由发生变化时，发射路由变化事件，并更新最新的路由信息
 */
export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  latestRoute = to;
}

/**
 * 监听路由变化
 * @param handler - 路由变化时的处理函数
 * @param immediate - 是否立即执行一次处理函数，默认为 true
 * 添加路由变化事件的监听器，如果 immediate 为 true 且存在最新路由信息，则立即执行一次处理函数
 */
export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler(latestRoute);
  }
}

/**
 * 移除路由监听器
 * 清除所有与路由变化相关的事件监听器
 */
export function removeRouteListener() {
  emitter.off(key);
}
