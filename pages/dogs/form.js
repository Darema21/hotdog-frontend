// pages/dogs/form.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
      name: "",
      gender: ["male", "female"],
      age: '00', 
      breed: "",
      bio: "",
      neutered: ["neutered", "not neutred"],
      vaccinated: ["vaccinated", "not vaccinated"],
      address: "",
      owner: "",
      formData: {},
      src: [],
    },

    listenerBtnChooseImage: function () {
      const page = this
      // Upload an image
      wx.chooseMedia({
        count: 5,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res.tempFiles)
          const filePath = res.tempFiles[0].tempFilePath
          wx.uploadFile({
            url:`${app.globalData.baseUrl}events/${id}/upload_image`,
            filePath: filePath,
            name:'file',
            success:function(res){
              console.log(res)
            }
          })
        }
      })
     },
      // adding this line below to have upload function and save images into cloudinary

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})
