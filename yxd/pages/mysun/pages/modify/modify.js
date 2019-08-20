var util = require('../../../../utils/cityArray.js')
var arrays = util.getAreaInfo();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['女', '男','保密'],
    citysIndex: [0, 0, 0],
    address:"",
    objectArray: [
      {
        id: 0,
        name: '男',
        number:1
      },
      {
        id: 1,
        name: '女',
        number: 0
      },
      {
        id: 2,
        name: '保密',
         number: 2
      },
     
    ],
    index: 0,
    username:"",
    mobile:"",
    address_sun:""
  },
  username:function(e){
    console.log(e.detail.value)
    var that=this
    var x = wx.getStorageSync("userinfo")
    var id = x.id
    wx.request({
      url: app.requestUrl + 'yuxile/public/index.php/api/Index/UserEdit',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: id,
        username: e.detail.value
      },
      success: function (res) {
        
        that.setData({
          username: res.data.data.username,
          mobile: res.data.data.mobile,
          address_sun: res.data.data.address,
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.objectArray[e.detail.value].number)
    this.setData({
      index: e.detail.value
    })
  },
  toChangePassword:function(){
    wx.navigateTo({
      url: '/pages/mysun/pages/ChangePassword/ChangePassword'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getuser()
    if (wx.getStorageSync('global_cityData')) {
      var cityArray = wx.getStorageSync('global_cityData');
    } else {
      //定义三列空数组
      var cityArray = [
        [],
        [],
        [],
      ];
      for (let i = 0, len = arrays.length; i < len; i++) {
        
        switch (arrays[i]['level']) {
          case 1:
            //第一列
            cityArray[0].push(arrays[i]["name"]);
            
            break;
          case 2:
            //第二列(默认由第一列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng']) {
              cityArray[1].push(arrays[i]["name"]);
            }
            break;
          case 3:
            //第三列(默认第一列第一个、第二列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng'] && arrays[i]['di'] == arrays[1]['di']) {
              cityArray[2].push(arrays[i]["name"]);
            }
            break;
        }
      }
      wx.setStorageSync('global_cityData', cityArray);
      console.log(cityArray)
    }

    that.setData({
      cityArray: cityArray
    });

  },
getuser:function(){
  var that=this
  var x = wx.getStorageSync("userinfo")
  var id = x.id
  console.log(id)
  wx.request({
    url: app.requestUrl +'yuxile/public/index.php/api/Index/UserEdit',
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      user_id: id
    },
    success:function(res){
      console.log(res.data.data)
      that.setData({
        username: res.data.data.username,
        mobile: res.data.data.mobile,
        
        address_sun: res.data.data.province + res.data.data.city + res.data.data.area,
        index:res.data.data.sex
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  func_changeCitysChange: function (e) {
    var that = this;
    var city=[]
    var cityArray = that.data.cityArray;
    console.log(cityArray)
    var address = '';
    
      //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
      var citysIndex = that.data.citysIndex;
    var province;
    var city;
    var area;
      for (let i in citysIndex) {
        address += cityArray[i][citysIndex[i]]
        var row={}
        if(i==0){
          province = cityArray[i][citysIndex[i]]
        }else if(i==1){
          city = cityArray[i][citysIndex[i]]
        }else if(i==2){
          area = cityArray[i][citysIndex[i]]
        }
       
        
       
      }
    
    var cityssun = citysIndex
    console.log(cityssun)
    var x = wx.getStorageSync("userinfo")
    var id = x.id
      wx.request({
        url: app.requestUrl + 'yuxile/public/index.php/api/Index/UserEdit',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: id,
          province: province,
          city: city,
          area: area,
         
        },
        success:function(res){
            console.log(res)
        }
      })
      that.setData({
        address_sun: address
      })
   

    
  },
  func_changeCitysChangeColumn: function (e) {
    var that = this;
    var cityArray = that.data.cityArray;

    var list1 = []; //存放第二列数据，即市的列
    var list2 = []; //存放第三列数据，即区的列

    var citysIndex = [];
    //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
    switch (e.detail.column) {
      case 0:
        //滑动左列
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[0][e.detail.value]) {
            var sheng = arrays[i]['sheng'];
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
            list1.push(arrays[i]['name']);
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == arrays[1]['di']) {
            list2.push(arrays[i]['name']);
          }
        }


        citysIndex = [e.detail.value, 0, 0];
        var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + '';

        that.setData({
          global_sheng: sheng
        });
        break;
      case 1:
        //滑动中列
        var di;
        var sheng = that.data.global_sheng;
        list1 = cityArray[1];
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[1][e.detail.value]) {
            di = arrays[i]['di'];
          }
        }
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == di) {
            
            list2.push(arrays[i]['name']);
          }
          console.log(di)
        }
        citysIndex = [that.data.citysIndex[0], e.detail.value, 0];
        
        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + '';

        break;
      case 2:
        //滑动右列
        list1 = cityArray[1];
        list2 = cityArray[2];
        citysIndex = [that.data.citysIndex[0], that.data.citysIndex[1], e.detail.value];

        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value] + '';
        break;
    }
 
    that.setData({
      "cityArray[1]": list1,//重新赋值中列数组，即联动了市
      "cityArray[2]": list2,//重新赋值右列数组，即联动了区
      citysIndex: citysIndex,//更新索引
      ssq: ssq,//获取选中的省市区
    });
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