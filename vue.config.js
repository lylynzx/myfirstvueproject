// const path = require('path');//引入path模块
// function resolve(dir){
//     return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
// }
// module.exports={
//     chainWebpack:(config)=>{
//         config.resolve.alias
//         .set('@',resolve('/src'))
//         .set('components',resolve('/src/components'))
//         .set('views',resolve('/src/views'))
//         .set('assets',resolve('/src/assets'))
//         .set('network',resolve('@/network'))
//         //set第一个参数：设置的别名，第二个参数：设置的路径
// 　　　　
//     }
// }

const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 开启 CSS source maps?
    css: {
        sourceMap: false,
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("utils", resolve("src/utils"))
            .set('components', resolve('/src/components'))
            .set('views', resolve('/src/views'))
            .set('assets', resolve('/src/assets'))
            .set('network', resolve('@/network'))
    }
};
//!!注意 该页面配置未生效，待后期解决  目前已知@ components 等路径可直接使用，但并非因为此文件