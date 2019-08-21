// pages/mysun/pages/ChangePassword/ChangePassword.js
var md5 = require('../../../../utils/md5.js')
var app = getApp();
var Original
var newpwd
var Determinepwd
var type
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Original:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Original:function(e){
    Original = e.detail.value;
    
  },
  newpwd: function (e) {
    newpwd = e.detail.value;


  },
  Determinepwd: function (e) {
    Determinepwd = e.detail.value;

  },
  onLoad: function (options) {
    type= options.type
  
    
    newpwd = options.toup_pwd
  },
  Determine:function(){
    var x = wx.getStorageSync("userinfo")
    var id = x.id
    if (Original == undefined || Original == ""){
      wx.showToast({
        title: '原始密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (newpwd == undefined || newpwd == "") {
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (Determinepwd == undefined || Determinepwd == "") {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none',
        duration: 1000
      })
    }else{
      console.log(newpwd);
      console.log(type);
      wx.request({
        url: app.requestUrl + 'api/Index/editPwd',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          type: type,
          newpwd: newpwd,
          user_id: id
        },
        success:function(res){
          console.log(res)
        }
      })
    }
    
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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