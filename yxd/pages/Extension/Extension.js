// pages/Extension/Extension.js
const app = getApp()
var types = 1
var page=1
var list_sun=[]
var all
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
    list_sun=[]
    page=1
    that.getlist(page)
  },
  onLoad: function (options) {
    var that=this
    that.getlist(page)
  },
  getlist: function (page){
    var x=wx.getStorageSync("userinfo")
    var that=this
    console.log(types)
    wx.request({
      url: app.requestUrl +'api/index/getUserList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        first_user: x.gym_no,
        type: types,
        page: page
      },
      success:function(res){
        for (var i = 0; i < res.data.data.list.data.length;i++){
          list_sun.push(res.data.data.list.data[i])
        }
        all = res.data.data.list.last_page
       
      that.setData({
        list: list_sun,
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
    var that=this
    console.log(all)
    if (page<all){
      page = page + 1
      that.getlist(page)
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})