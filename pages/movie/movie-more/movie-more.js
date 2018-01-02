// pages/movie/movie-more/movie-more.js
var utils = require('../../../utils/utils');
var app = getApp();
var doubanBase = app.globalData.doubanBase;
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      var that = this;
    var categorg = options.id;
    var title = options.title;
    var dataUrl = doubanBase+"/v2/movie"+categorg;
    utils.http(dataUrl, that.processDoubanData)

  },

  processDoubanData: function (moviesDouban, key, title) {

      var movies = [];
      for (var index in moviesDouban.subjects) {
          var subject = moviesDouban.subjects[index];
          if (movieTitle.length > 6) {
              movieTitle = movieTitle.substring(0, 6) + "...";
          }
          var temp = {
              stars: utils.convertToStarsArray(subject.rating.stars),
              movieTitle: movieTitle,
              average: subject.rating.average,
              movieId: subject.id,
              coverageUrl: subject.images.large
          };
          movies.push(temp);
      }
      this.setData({
          "movies":movies
      });
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