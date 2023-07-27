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
      breed: ["Beagle", "Bulldog", "Chihuahua", "Corgi", "French Bulldog", "German Shepherd", "Golden Retriever", "Husky", "Labrador", "Parson Russell Terrier", "Pug", "Poodle (Toy)", "Other"],
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
        count: 3,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res.tempFiles)
          const filePath = res.tempFiles[0].tempFilePath
          wx.uploadFile({
            url:`${app.globalData.baseUrl}dogs/${id}/upload_image`,
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

      imgLongPress: function (){
        // Save image to album
        wx.saveImageToPhotosAlbum({
          filePath: this.data.src,
    
          success(res) {
            wx.showToast({
              title: 'Save',
              icon: 'success',
              duration: 1500
            })
          console.log('success')
        }
      })
    },
    
    // onSwitchChange: function (dog) {
    //   this.setData({
    //     isVaccinated: dog.detail.value,
    //     isNeutered: dog.detail.value,
    //   });
    // },
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
      const page = this;
      if (this.data.resetData) this.resetData()
      const id = wx.getStorageSync('editedId');
  
      if (id) {
        console.log('id found');
        wx.request({
          url: `${app.globalData.baseUrl}dogs/${id}`,
          success(res) {
            console.log(res);
            page.setData({
              formData: res.data,
              editedId: id
            });
            wx.removeStorageSync('editedId');
          }
        });
      }
    },
    
    setInputData(e) {
      let {formData} = this.data
      formData[e.currentTarget.dataset.field] = e.detail.value
      this.setData({formData})
    
      if (field === 'name' && value.length > 50) {
        wx.showToast({
          title: 'name cannot exceed 50 characters',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    
      if (field === 'bio' && value.length > 200) {
        wx.showToast({
          title: 'Bio cannot exceed 200 characters',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    
      formData[field] = value;
      this.setData({ formData });
    },

    bindBreedChange(e) {
      console.log(e)
      let page = this
      page.setData({resetData:false})
      let { formData } = this.data;
      formData['dogIndex'] = e.detail.value;
      this.setData({ formData });
    },

    save(e) {
      // Post data to API
      const page = this;
      const event = e.detail.value;
      event.owner_id = 1;
  
      if (page.data.editedId !== undefined && page.data.editedId !== null) {
        wx.request({
          url: `${app.globalData.baseUrl}dogs/${page.data.editedId}`,
          method: 'PUT',
          data: { dog: dog },
          success(res) {
            console.log(res);
            page.setData({resetData:true})
            wx.switchTab({
              url: '/pages/dogs/index',
            })
          }
        });
      } else {
        wx.request({
          header: app.globalData.header,
          url: `${app.globalData.baseUrl}dogs/`,
          method: 'POST',
          data: { dog: dog },
          success(res) {
            console.log(res);
            page.setData({resetData:true})
            wx.switchTab({
              url: '/pages/dogs/index',
            })
          },
          fail(res) {
            console.log(res);
            // Handle failure response
            console.log(res);
            wx.showToast({
              title: 'Failed to create dog profile',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    },
  
    resetData(){
      this.setData({
        formData: {},
      })
    },
})
             