// pages/Extension/Extension.js
const app = getApp()
var types = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    list:[],
    zj:"",
    lj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  click: function (e) {
    var that=this
    var idx = e.target.dataset.index;
    console.log(idx)
   
    that.setData({
      currentTab: idx
    })
    idx = parseInt(idx)+1
    types=idx
    that.getlist()
  },
  onLoad: function (options) {
    var that=this
    that.getlist()
  },
  getlist: function (){
    var x=wx.getStorageSync("userinfo")
    var that=this
    console.log(types)
    wx.request({
      url: app.requestUrl +'yuxile/public/index.php/api/Index/getUserList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        first_user: x.gym_no,
        type: types
      },
      success:function(res){
        console.log(res)
      that.setData({
        list: res.data.data.list,
        zj: res.data.data.usersum,
        lj: res.data.data.sum,
      })
      }
    })
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