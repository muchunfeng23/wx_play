Page({
  data: {
    cName:'',
    cTelephone:'',
    cIdCard:''
  },
  formSubmit(e) {
    wx.request({
      url: 'https://www.man-help.cn:8080/nanhang/addUser',
      method:"post",
      data:{
          "userName": this.data.cName,
          "identiyCard": this.data.cIdCard,
          "phone": this.data.cTelephone
      },
      success(res){
        console.log(res)
        if(res.data == "ok"){
          wx.showToast({
            title: '添加成功',
            icon: 'success'
          })
        } else if (res.data == "idcard error"){
          wx.showToast({
            title: '身份证号码不正确'
          })
        } else if (res.data == 'phone error') {
          wx.showToast({
            title: '手机号码不正确'
          })
        }else if(res.data == "error"){
          wx.showToast({
            title: '请填完整信息'
          })
        }
      }
    })
  },
  cNameInput(e){
    console.log(e);
    this.setData({
      cName:e.detail.value
    });
  },
  cIdCardInput(e) {
    console.log(e);
    this.setData({
      cIdCard: e.detail.value
    });
  },
  cTelephoneInput(e) {
    console.log(e);
    this.setData({
      cTelephone: e.detail.value
    });
  }

})