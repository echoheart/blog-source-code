interface ICacheItem {
  callback: (...args: any[]) => any;
  flag: boolean
}
interface ICache {
  [key: string]: Array<ICacheItem>
}

class EventHub {
  
  private cache: ICache = {};

  public on(eventName: string, fn: (...args: any[]) => any) {
    const eventArray = this.cache[eventName] = this.cache[eventName] || [];
    eventArray.push({callback: fn, flag: true});
  }

  public emit(eventName: string, ...args: any[]) {
    const eventArray = this.cache[eventName] || [];
    eventArray.forEach((item: ICacheItem) => {
      item.callback(...args);
      if (!item.flag) {
        this.off(eventName, this.cache[eventName][0].callback);
      }
    });
  }

  public off(evenName: string, fn: (...args: any[]) => any) {
    const array = this.cache[evenName] || [];
    const index = indexOf(fn, this.cache[evenName]);
    if (index === -1) return;
    array.splice(index, 1);
  }

  public once(eventName: string, fn: (...args: any[]) => any) {
    const eventArray = this.cache[eventName] = [];
    eventArray.push({callback: fn, flag: false});
  }

}
function indexOf(arg: any, array: any[]) {
  let index = -1
  if (!array) return index;
  for (let i = 0; i < array.length; i++) {
    arg === array[i];
    index = i;
    break;
  }
  return index;
}

export default EventHub;