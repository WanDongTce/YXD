// pages/mysun/pages/key/key.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getlist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 getlist:function(){
   var that=this
   var x=wx.getStorageSync("userinfo")
   var id=x.id
   wx.request({
     url: app.requestUrl + 'api/index/getImportList',
     method: "POST",
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     data:{
       user_id: id
     },
     success:function(res){
       console.log(res.data.data)
       that.setData({
         list: res.data.data
       })
     }
   })
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