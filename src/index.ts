/**
 * 发布订阅
 */
class EventHub {
  /**
   * { 'xxx': [fn1, fn2, fn3], 'yyy': [fn1, fn2, fn3] }
   */
  private events: { [key: string]: Array<(data: unknown) => void> } = {};

  /**
   * 发布
   * @param eventName 订阅事件名称
   */
  emit(eventName: string, data?: unknown) {
    // 调用 this.events[eventName] 中的 fn
    (this.events[eventName] || []).forEach((fn: Function) => fn(data));
  }

  /**
   * 订阅
   * @param eventName 订阅事件名称
   * @param fn 事件执行函数
   */
  on(eventName: string, fn: (data: unknown) => void) {
    // 初始化, 并将 fn 推进 this.events[eventName]
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  /**
   * 取消订阅
   * @param eventName 订阅事件名称
   * @param fn 事件执行函数
   */
  off(eventName: string, fn: (data: unknown) => void) {
    let index: number = this.events[eventName].indexOf(fn);
    index !== -1 && this.events[eventName].splice(index, 1);
  }
}

export default EventHub;
