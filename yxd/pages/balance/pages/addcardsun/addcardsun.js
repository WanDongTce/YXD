// pages/balance/pages/addcardsun/addcardsun.js

var bankCard = require('../../../../utils/bankCard.js');
var app = getApp();
var card
var username
var cardType
var phoneNum
var branch
var bank
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInputCardNum: '', // 银行卡账号
    cardlen: 0,
    bankName: '', // 银行名字
    cardType: '', // 银行卡类型
    user: '',// 持卡人姓名
    phone: '', // 持卡人手机号
    branch:"",//支行
    bank:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bankcardInput: function (e) {
     card = e.detail.value;


    // 格式
    var len = card.length
    //判断用户是输入还是回删
    if (len > this.data.cardlen) {
      //用户输入
      if ((len + 1) % 5 == 0) {
        card = card + ' '
      }
    } else {
      //用户回删
      card = card.replace(/(^\s*)|(\s*$)/g, "")
    }
    //将处理后的值赋予到输入框
    this.setData({
      userInputCardNum: card
    })
    //将每次用户输入的卡号长度赋予到长度中转站
    this.setData({
      cardlen: len
    });
    let cardNum = this.data.userInputCardNum.replace(/\s*/g, ""); // 格式化字符串的空格
    var temp = bankCard.bankCardAttribution(cardNum);
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    }
    else {
      this.setData({
        cardType: temp.bankName + temp.cardTypeName,
      })
    }
  },
  bankcardTypeInput: function (e) {
    cardType = e.detail.value;
    this.setData({
      cardType: cardType
    })
  },
  // 持卡人姓名事件
  userInput: function (e) {
   username = e.detail.value;
    this.setData({
      user: username
    })
  },
  // 持卡人手机号事件
  phoneInput: function (e) {
    phoneNum = e.detail.value;
    this.setData({
      phone: phoneNum
    })
  }
,
  bank: function (e) {
    bank = e.detail.value;
    this.setData({
      bank: bank
    })
  },
  branch: function (e) {
    branch = e.detail.value;
    this.setData({
      branch: branch
    })
  },
  addcar:function(){
    console.log(card)
    var x = wx.getStorageSync("userinfo")
    if (username == undefined||username==""){
     
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (card == undefined || card == ""){
      wx.showToast({
        title: '银行卡不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (cardType == undefined || cardType == "") {
      wx.showToast({
        title: '银行卡类型不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (phoneNum == undefined || phoneNum == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (bank == undefined || bank == "") {
      wx.showToast({
        title: '银行不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (branch == undefined || branch == "") {
      wx.showToast({
        title: '支行不能为空',
        icon: 'none',
        duration: 1000
      })
    }else{
      console.log(cardType)
      wx.request({
        url: app.requestUrl +'api/Info/AddCardInfo',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          card_no: card,
          type: cardType,
          bank_name: branch,
          user_id:x.id,
          name:bank
        },
        success:function(res){
          console.log(res)
        }
      })
    }
  },
  onLoad: function (options) {

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