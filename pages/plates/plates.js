function calcWidth(amount){
  var absAmount = Math.abs(amount);
  var width = wx.getSystemInfoSync().windowWidth / 2;
  if (absAmount < 5000){
    return (width / 4)/5000 * absAmount;
  } else if (absAmount < 200000){
    return width / 4 + (width / 4)/200000 * absAmount;
  }else{
    return width / 2 + (width / 2) / 5000000 * absAmount;
  }
}
function sendRequest(searchParam,that){
  wx.request({
    url: 'https://www.man-help.cn:8080/shares/platesData',
    data: {
      searchParam: searchParam
    },
    success(res) {
      var canvasIdPlus = searchParam - 1;
      var platesInfos = res.data;
      for (var aPlatInfo in platesInfos) {
        var context = wx.createCanvasContext(platesInfos[aPlatInfo].platName + canvasIdPlus);
        var infoMap = platesInfos[aPlatInfo].datekeyAmountMap;
        var width = wx.getSystemInfoSync().windowWidth;
        var startX = 0;
        var startY = 0;
        var newWidth = 0;
        // var baseWidth = 900000 / width;
        for (var key in infoMap) {
          startX = width / 2;
          newWidth = calcWidth(infoMap[key]);
          if (infoMap[key] > 0) {
            // newWidth = infoMap[key] / baseWidth;
            context.setFillStyle('red');
            context.fillRect(startX, startY, newWidth, 23);
            context.setTextAlign('left');
            context.setFillStyle('#000000');
            context.setFontSize(10);
            context.fillText(infoMap[key] + "万元",width / 2 ,startY + 10);
          } else if (infoMap[key] < 0) {
            newWidth = -newWidth;
            startX = startX + newWidth;
            context.setFillStyle('green');
            context.fillRect(startX, startY, -newWidth, 23);
            context.setTextAlign('left');
            context.setFillStyle('#000000');
            context.setFontSize(10);
            context.fillText(infoMap[key] + "万元", width / 2, startY + 10);
          }
          startY += 30;
        }
        context.draw();
      }
      that.setData({
        platesDataList: res.data,
        screenWidth: wx.getSystemInfoSync().windowWidth,
        modeIndex:searchParam - 1
      })
    }
  })
}

Page({
  data: {
    modeIndex:0,
    modeSelect: ['概念净流入', '概念净流出', '板块净流入', '板块净流出'],
    platesDataList:[],
    screenWidth:0
  },
  bindPickerChange(e) {
    var that = this;
    var newSelect = Number(e.detail.value) + 1;
    sendRequest(newSelect, that);
  },
  onLoad:function(e){
    var that = this;
    sendRequest(4, that);
    
    that.setData({
      modeIndex:3
    });
  },
  canvasIdErrorCallback:function(e){
    console.log(e)
  }
})