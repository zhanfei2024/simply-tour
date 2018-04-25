const fs = require('fs');
const pathHelper = require('path');
const shell = require('shelljs');
const extfs = require('fs-extra');

class LocalAdapter {

  constructor(config) {
  }

  /**
   * Check whether a file exists.
   *
   * @param {string} path
   *
   * @return {boolean}
   * @public
   */
  has(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, (err) => {
        return resolve(!err);
      });
    });
  }

  /**
   * Read a file.
   *
   * @param {string} path
   *
   * @return Promise<Buffer>
   */
  read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * Read a file with stream
   *
   * @param {string} path
   *
   * @return Promise<Stream>
   */
  readStream(path) {
    return new Promise((resolve, reject) => {
      return resolve(fs.createReadStream(path));
    });
  }

  /**
   * Write a new file.
   *
   * @param {string} path
   * @param {string|Buffer} contents
   * @param config Config object
   *
   * @return Promise
   */
  write(path, contents, config) {
    return new Promise((resolve, reject) => {
      // 获取项目路径
      let websiteRoot = pathHelper.resolve(pathHelper.normalize(__base), '../');
      // 找到目标路径中，/最后出现一次的位置
      const num = contents.lastIndexOf('/');
      const newPath = pathHelper.join(websiteRoot, contents.substring(0, num));
      // 验证路径是否存在，不存在将创建一个全路径。
      if (!fs.existsSync(newPath)) {
        shell.mkdir('-p', newPath);
      }
      // contents自带/
      fs.rename(`${websiteRoot}/${path}`, `${websiteRoot}/${contents}`, (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
    });
  }

  /**
   * Write a new file using a stream.
   *
   * @param {string} path
   * @param {Stream} resource
   * @param config Config object
   *
   * @return Promise
   */
  writeStream(path, resource, config) {
    return new Promise((resolve, reject) => {
      try {
        const stream = fs.createWriteStream(path);
        resource.pipe(stream, {end: false});
        resource.on('end', () => {
          stream.end();
          resource.destroy();
          return resolve(true);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * Delete a file.
   *
   * @param {string} path
   *
   * @return Promise
   */
  delete(path) {
    return new Promise((resolve, reject) => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) {
            if (err.errno !== -2) {
              return reject(err);
            }
          }
          // 找到目标路径中，/最后出现一次的位置
          const num = path.lastIndexOf('/');
          // 删除随机生成的文件夹
          const newPath = path.substring(0, num);
          // 如果目录为空，删除生成目录
          try {
            fs.readdirSync(newPath);
          } catch (err) {
            return fs.rmdirSync(newPath);
          }
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
      
    });
  }

  /**
   * Delete a directory.
   *
   * @param {string} path
   *
   * @return Promise
   */
  deleteDir(path) {
    return extfs.emptyDirSync(path);
  }

  /**
   * Get the size of a file.
   *
   * @param {string} path
   *
   * @return {integer}
   */
  getSize(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) return reject(err);
        return resolve(stats.size);
      });
    });
  }
}

module.exports = LocalAdapter;
