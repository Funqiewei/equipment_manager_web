module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://iwenwiki.com',
                // 允许跨域
                changOringin:true,
                // 重写路径
                pathRewrite:{
                    '^/api':''
                }
            },
           
        }
    }

}