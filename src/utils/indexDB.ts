const dbName = 'pptIDB' // 数据库名称
let version = new Date().getTime()
const storeName = 'ppt-snapshot' // 表名

class IndexDB {
  db: any
  // request
  constructor() {
    this.db = null;
  }
  onsuccess = (event: any) => {
    this.db = event.target.result;
  };
  onerror = (event: any) => {
  };
  // 数据库创建或升级的时候会触发
  onupgradeneeded = (event: any) => {
    this.db = event.target.result
    if(!this.db.objectStoreNames.contains(storeName)) { // 判断表是否存在
      this.db.createObjectStore(storeName, { keyPath: 'id' })
    }
  }
  
  // 开启indexedDB服务
  openDB = () => {
    return new Promise((resolve, reject) => {
      const indexDB = window.indexedDB
      const request = indexDB.open(dbName, version)
      request.onsuccess = (evt: any) => {
        this.db = evt.target.result
        resolve(true)
      }
      request.onerror = (evt: any) => {
        this.db = evt.target.result
        reject(false)
      }
      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result
        if(!this.db.objectStoreNames.contains(storeName)) { // 判断表是否存在
          this.db.createObjectStore(storeName, { keyPath: 'id' })
        }
      }
    })
  }
  /**增加 */
  add = (data: any) => {
    try {
      const next = this.db.transaction([storeName], "readwrite").objectStore(storeName).add(data);
      next.onsuccess = this.addOnSuccess;
      next.onerror = this.addOnError;
      next.onupgradeneeded = this.onupgradeneeded
    } catch (err) {
      console.log(err);
    }
  };
  addOnSuccess = () => {
    console.log("数据添加成功");
  };
  addOnError = () => {
    console.log("数据添加失败");
  };
  /**查询 */
  read = () => {
    return new Promise((resolve, reject) => {
      const next = this.db.transaction([storeName], "readwrite");
      const objectStore = next.objectStore(storeName);
      const request = objectStore.getAll()
      request.onsuccess = (event: any) => {
        if (event.target.result) {
          resolve([...(event?.target?.result || [])])
        } else {
          reject([])
        }
      };
      request.onerror = (event: any) => {
        reject([])
        console.log("数据读取失败");
      };
    })
  };
  /**查询 */
  delete = (id: number) => {
    return new Promise((resolve, reject) => {
      const next = this.db.transaction([storeName], "readwrite");
      const objectStore = next.objectStore(storeName);
      const request = objectStore.delete(id)
      request.onsuccess = (event: any) => {
        console.log("数据删除成功");
          resolve(true)
      };
      request.onerror = (event: any) => {
        reject([])
        console.log("数据删除失败");
      };
    })
  };
  // 删除数据库
  clear = () => {
      const request = window.indexedDB.deleteDatabase(dbName)
      return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log('数据全部清理成功')
        resolve(true)
      }
      request.onerror = () => {
        console.log('数据全部清理失败')
        reject(false)
      }
    })
  }
  // 关闭
  close = () => {
    return new Promise((resolve, reject) => {
      const indexedDB = window.indexedDB
      const request = indexedDB.open(dbName, version)
     
      request.onsuccess = function(event: any) {
        const db = event.target.result
        db.close()
        console.log('db 已关闭')
      }
      request.onerror = function(event: any) {
        reject(event)
      }
    })
  }
}

export const indexDB = new IndexDB()