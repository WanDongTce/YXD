// pages/loginsun/pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_left_phone: '',
    user_left_password: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toregister:function(){
    wx.navigateTo({
      url: '/pages/loginsun/pages/register/register'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  user_left_phone: function (e) {
    this.setData({
      user_left_phone: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  //输入左侧的密码
  user_left_password: function (e) {
    this.setData({
      user_left_password: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  getUserInfoFun: function () {
    var S = this;
 
  },
  click_left_login: function (e) {
    var that = this;
    var user_left_phone = that.data.user_left_phone;
    console.log(user_left_phone)
    var user_left_password = that.data.user_left_password;
    if (user_left_phone.length == 0 || user_left_password.length == 0) {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(user_left_phone))) {
      wx.showToast({
        title: '手机号不合法',
        image: '../../../images/error.png',
        duration: 1000
      })
    }
    else {
      console.log("成功")
      wx.request({
        url: app.requestUrl + 'api/Login/Login',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          mobile: user_left_phone,
          password: user_left_password,
        },
        success:function(res){
          console.log(res.data.data)
          wx.setStorageSync("userinfo", res.data.data)
          wx.navigateBack({
            delta: 1,
          })
          
        }
      })


      // network.POST({
      //   url: 'v11/login/index',
      //   params: {
      //     "mobile": user_left_phone,
      //     "password": md5.hexMD5(user_left_password),
      //     "version_number": "0",
      //     "lng": '',
      //     "lat": '',
      //     "login_source": 1
      //   },
      //   success: function (res) {
      //     wx.hideLoading();
      //     if (res.data.code == 200) {
      //       var a = res.data.data[0];
      //       wx.setStorage({
      //         key: 'userInfo',
      //         data: a
      //       });
      //       app.userInfo = a;

      //       if (a.step == 8) {
      //         //登录后如果有分享跳到分享页面
      //         console.log('that.data.next f: ', that.data.next)
      //         if (that.data.next) {
      //           console.log('执行跳转');
      //           //获取图片和标题
      //           wx.request({
      //             url: app.requestUrl + 'v14/chinese/poetryinfo', //仅为示例，并非真实的接口地址
      //             header: {
      //               'content-type': 'application/x-www-form-urlencoded' // 默认值
      //             },
      //             method: 'POST',
      //             data: {
      //               "token": app.userInfo.token,
      //               "mobile": app.userInfo.mobile,
      //               "app_source_type": app.app_source_type,
      //               "read_id": that.data.scid

      //             },
      //             success(res) {
      //               var image = res.data.data[0].item.imgUrl;
      //               var name = res.data.data[0].item.rname;
      //               wx.setStorageSync("pic", res.data.data[0].item.imgUrl)
      //               wx.setStorageSync("rname", res.data.data[0].item.rname)
      //               //
      //               wx.navigateTo({
      //                 url: "/" + `${that.data.next}?id=${that.data.id}&good=${that.data.good}&scid=${that.data.scid}`,
      //               })
      //             }
      //           })

      //         } else {
      //           //
      //           wx.switchTab({
      //             url: '/pages/main/pages/home/home'
      //           });
      //         }

      //       } else {
      //         wx.navigateTo({
      //           url: '/pages/common/presonalInfo/presonalInfo'
      //         });
      //       }
      //     } else {
      //       wx.showToast({
      //         title: res.data.message,
      //         icon: 'none',
      //         duration: 1000
      //       })
      //     }
      //   },
      //   fail: function () {
      //     wx.hideLoading();
      //     wx.showToast({
      //       title: '服务器异常',
      //       icon: 'none',
      //       duration: 1000
      //     })
      //   }
      // })


    }
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})