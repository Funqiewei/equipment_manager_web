module.exports={
    devServer:{
        proxy:{
            '/bpi':{
                target:'http://47.96.116.218:8889/api/private/v1/',
                secure: true,
                // ws: true,    
                changeOrigin: true,//这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
                pathRewrite: {
                    '^/bpi': ''
                  }
          
            },
            '/api':{
                target:'https://ztuser.ltd/equipment_server',
                secure: true,
                 // 允许跨域
                changeOrigin: true,//这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
                // 重写路径
                pathRewrite:{
                    '^/api':'/'
                },
            },
           
        }
    }

}