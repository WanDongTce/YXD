// pages/loginsun/pages/register/register.js
var regMobile = /^1(3|4|5|7|8)\d{9}$/;
var regPassw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
var c = 60;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user_right_phone: '',
        user_right_password: '',
    user_right_codes: '',
    confirm_right_password: '',
    Invitation_right_password:"",
    verifyCodeTime: "获取验证码",
    verify_color: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  user_right_phone: function (e) {
    this.setData({
      user_right_phone: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  //输入右侧的密码
  user_right_password: function (e) {
    this.setData({
      user_right_password: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  confirm_right_password: function (e) {
    this.setData({
      confirm_right_password: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  Invitation_right_password: function (e) {
    this.setData({
      Invitation_right_password: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  user_right_codes: function (e) {
    this.setData({
      user_right_codes: e.detail.value.replace(/^\s*|\s*$/, '')
    })
  },
  identify: function (e) {
    var that = this;
    if (!that.data.verify_color) {
      var user_right_phone = that.data.user_right_phone;
      console.log(user_right_phone)
      var intervalId = null;

      if (!regMobile.test(user_right_phone)) {
        wx.showToast({
          title: '手机号不合法',
          icon: 'none',
          duration: 1000
        })
      } else {
        that.setData({
          verify_color: true
        });
        intervalId = setInterval(function () {
          c--;
          that.setData({
            verifyCodeTime: c + 's后重发'
          })
          if (c <= 0) {
            clearInterval(intervalId);
            c = 60;
            that.setData({
              verifyCodeTime: '获取验证码',
              verify_color: false
            })
          }
        }, 1000);
        // that.sendCode(user_right_phone);
      }
    }
  },
  getUserInfoFun: function () {
    var S = this;
    wx.getUserInfo({
      success: function (res) {
        console.log("userInfo:" + res)
        　　　　　　　//do anything
       
      },
      fail: S.showPrePage
    })
  },
  bindFormSubmit: function (e) {
    var that = this;
    // 手机号
    var phone = that.data.user_right_phone
    // 验证码
    var vcode = that.data.user_right_codes
    console.log(vcode)
    // 密码
    var password = that.data.user_right_password

    var confirm = that.data.confirm_right_password
    var Invitation = that.data.Invitation_right_password
    console.log(confirm)
    if (!regMobile.test(phone)) {
      wx.showToast({
        title: '手机号不合法',
        icon: 'none',
        duration: 1000
      })
    }
    else if (password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if (!regPassw.test(password)) {
      wx.showToast({
        title: '密码6-18位，包含至少一个字母和一个数字',
        icon: 'none'
      })
    }
    else if (vcode.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    } else if (confirm.length==0){
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none'
      })
    } else if (password != confirm){
      console.log(regPassw)
      console.log(confirm)
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
    } else if (Invitation.length == 0) {
      wx.showToast({
        title: '邀请码不能为空',
        icon: 'none'
      })
    }else{
      wx.request({
        url: app.requestUrl +'yuxile/public/index.php/api/Login/register',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          mobile: phone,
          type: 1,
          password: password,
          gym_no: Invitation//CSBeJzf58AbF
        },
        success:function(res){
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

      })
    }

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