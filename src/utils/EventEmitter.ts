class EventEmitter {
  handles: any;
  constructor() {
    if(!this.handles) {
      this.handles = Object.create(null);
    }
  }

  on(evt: any, cb: any) {
    if(!this.handles[evt]) {
      this.handles[evt] = [];
    }
    this.handles[evt].push(cb);
  }
  off(evt: any, cb: any) {
    const listeners = this.handles;
    const arr = listeners[evt] || [];
    var i = arr.indexOf(cb);
    if (i >= 0) {
        listeners[evt].splice(i, 1);
    }
  }

  emit(evt: any, ...arg: any) {
    if(!!this.handles[evt]) {
      this.handles[evt].forEach((item: any, i: number) => {
        if(typeof item === 'function') {
          Reflect.apply(item, this, arg);
        } else {
          return console.error(`${item} is not a function in [${i}]`)
        }
      })
    }
  }
}
const Events = new EventEmitter();
export default Events