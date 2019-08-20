//index.js
//获取应用实例
const app = getApp()
var flg = true
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    price:"",//余额
    usersum:"",//推广专员
    total_price:"",
    gym_no:"",
    card_num:"",
    bannerlist:[]
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  toRecharge: function () {
    wx.navigateTo({
      url: '/pages/mysun/pages/Recharge/Recharge'
    })
  },
  onShow:function(){
    var that=this
   var x=wx.getStorageSync("userinfo" )
    console.log(x.length)
    
    if (x<1) {
      wx.navigateTo({
        url: '/pages/loginsun/pages/login/login'
      })
    }else{
      that.setData({
        price:x.price,
        usersum: x.usersum,
        total_price: x.total_price,
        gym_no: x.gym_no,
        card_num: x.card_num
      })
    }

  },
 
  onLoad: function () {
var that=this

    that.getbanner()
    

  },
  getbanner:function(){
    var that=this
    wx.request({
      url: app.requestUrl +'yuxile/public/index.php/api/Index/getBanner',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          bannerlist: res.data.data
        })
      }
    })
  }

})
