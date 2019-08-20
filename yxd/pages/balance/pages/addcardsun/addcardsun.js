// pages/balance/pages/addcardsun/addcardsun.js

var bankCard = require('../../../../utils/bankCard.js');
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
    phone: '' // 持卡人手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bankcardInput: function (e) {
    var card = e.detail.value;


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
    let cardTypeInput = e.detail.value;
    this.setData({
      cardType: cardTypeInput
    })
  },
  // 持卡人姓名事件
  userInput: function (e) {
    let username = e.detail.value;
    this.setData({
      user: username
    })
  },
  // 持卡人手机号事件
  phoneInput: function (e) {
    let phoneNum = e.detail.value;
    this.setData({
      phone: phoneNum
    })
  }
,
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