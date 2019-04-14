Page({
  data: {
    allLongHuDatas:[],
    conceptMap:{},
    sortShareCodes:[],
    nowSelectedStocks:[],
    selectStatus:[]
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: 'https://www.man-help.cn:8080/shares/longhuData',
      method: "post",
      success(res) {
        var selectStatusList = new Array();
        for (var aEntry in res.data.conceptMap) {
          selectStatusList.push("labelNoSelect");
        }
        that.setData({
          conceptMap: res.data.conceptMap,
          sortShareCodes: res.data.sortShareCodes,
          selectStatus: selectStatusList
        });
      }
    })
  },
  clickConcept:function(e){
    console.log(e);
    var that = this;
    var nowConceptDesc = e.target.dataset.nowconcept;
    var nowIndex = e.target.dataset.nowindex;
    console.log("nowIndex = " + nowIndex);
    var nowSelectStatusArray = that.data.selectStatus;
    for (var aStatus in nowSelectStatusArray){
      nowSelectStatusArray[aStatus] = "labelNoSelect";
    }
    nowSelectStatusArray[nowIndex] = "labelSelect";
    var leftIndex = nowConceptDesc.indexOf("(");
    var nowConcept = nowConceptDesc.substring(0,leftIndex);
    var conceptMap = that.data.conceptMap;
    that.setData({
      nowSelectedStocks: conceptMap[nowConcept],
      selectStatus: nowSelectStatusArray
    })
  }
})

