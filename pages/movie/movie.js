// pages/movie/movie.js
var utils = require('../../utils/utils');
var app = getApp();
var doubanBase = app.globalData.doubanBase;
Page({

  data: {
      "inTheaters":{},
      "comingSoon":{},
      "top250":{}
  },
  onLoad: function (options) {
    var that = this;
    var inTheatersUrl = doubanBase+"/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = doubanBase+"/v2/movie/coming_soon?start=0&count=3";
    var top250Url = doubanBase+"/v2/movie/top250?start=0&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","top250");
  },
    getMovieListData:function(url,key,title){
        var that = this;

        utils.http(url,function(data){
            that.processDoubanData(data,key,title)
        });
    },
    processDoubanData:function(moviesDouban,key,title){

        var movies = [];
        for(var index in moviesDouban.subjects){
            var subject = moviesDouban.subjects[index];
            var movieTitle = subject.title;
            if(movieTitle.length>6){
                movieTitle = movieTitle.substring(0,6)+"...";
            }
            var temp = {
                stars:utils.convertToStarsArray(subject.rating.stars),
                movieTitle:movieTitle,
                average:subject.rating.average,
                movieId:subject.id,
                coverageUrl:subject.images.large
            };
            movies.push(temp);
        }
        var readyData ={};
        readyData[key]={
            "movies":movies,
            "title":title
        };
        this.setData(readyData);
    }
})