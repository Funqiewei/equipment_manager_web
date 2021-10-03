module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://ztuser.ltd/equipment_server/',
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