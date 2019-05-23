exports.MountainClient = MountainClient;

const MountainClientImpl = require(__dirname + '/impl/mountainclientimpl.js').MountainClientImpl;

// The following may or may not apply to this version;
//   Note: for webpack we need: externals:{"fs":"require('fs')"}

function MountainClient() {
  let impl = new MountainClientImpl();

  this.setPairioUrl = function(url) {
    impl.setPairioUrl(url);
  };
  this.configDownloadFrom = function(name_or_list) {
    impl.configDownloadFrom(name_or_list);
  }
  this.getValue = async function(opts) {
    return await impl.getValue(opts);
  }
  this.readDir = async function(path, opts) {
    opts=opts||{};
    return await impl.readDir(path, opts);
  };
  this.loadObject = async function(path, opts) {
    opts=opts||{};
    return await impl.loadObject(path, opts);
  }
  this.loadText = async function(path, opts) {
    opts=opts||{};
    return await impl.loadText(path, opts);
  }
  this.loadBinary = async function(path, opts) {
    opts=opts||{};
    return await impl.loadBinary(path, opts);
  }
}