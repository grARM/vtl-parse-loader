'use strict';
var loaderUtils = require('loader-utils')
var path = require('path')
var fs = require('fs')
var VmHelper = require('./util/velocity.helper.js')

var watcher;

module.exports = function (source) {

    if (this.cacheable) {
        this.cacheable(true)
    }
    var callback = this.async();
    var options = loaderUtils.getOptions(this);
    // /src/page/somepage/page.vm
    var vmPath = this.resourcePath;
    // /src/page/somepage
    var pagePath = path.dirname(vmPath);
    // /somepage.vm
    var pageName = path.basename(pagePath);
    // /src
    var srcPath = path.dirname(path.dirname(pagePath));

    if (!/page/.test(pagePath)) {
        callback(null, source);
        return
    }

    watcher = this.addDependency
    // watcher(vmDataPath);
    // watcher(vmMetaPath);

    //清除require缓存
    // delete require.cache[vmDataPath]
    // var vmData = require(vmDataPath);

    // var vmMeta = fs.readFileSync(vmMetaPath, 'utf8');

    var sourceAll = VmHelper.processParse(source, vmPath, srcPath, 1, watcher);

    // var tmpSourceAll = sourceAll.split('<body');

    // console.log(options.env);

    // sourceAll = options.env === 'prod' ? `${tmpSourceAll[0]}${vmMeta}<body${tmpSourceAll[1]}`
    //     : `${tmpSourceAll[0]}
    //     <script>
    //         console.log('直出数据：', ${JSON.stringify(vmData)})
    //     </script>
    //     ${vmMeta}<body${tmpSourceAll[1]}`;

    // var result = options.env === 'prod' ?
    //     sourceAll : VmHelper.render(sourceAll, vmData, null, {
    //         escape: false
    //     });
    // fs.writeFileSync( path.join(pagePath, 'test.html'), result, 'utf8')

    // callback(null, result);
    callback(null, sourceAll);

}
