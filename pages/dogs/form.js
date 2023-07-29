// pages/dogs/form.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
      name: "",
      gender: ["male", "female"],
      age: '',
      breed: ["Beagle", "Bulldog", "Chihuahua", "Corgi", "French Bulldog", "German Shepherd", "Golden Retriever", "Husky", "Labrador", "Parson Russell Terrier", "Pug", "Poodle (Toy)", "Other"],
      breed_value: "",
      gender_value: "",
      bio: "",
      neutered: false,
      vaccinated: false,
      address: "",
      formData: {},
      src: ""
    },

    upload(id) {
      const page = this
      wx.uploadFile({
        url:`${app.globalData.baseURL}dogs/${id}/upload_image`,
        filePath: page.data.src[0],
        header: app.globalData.header,
        name:'image',
        success (res){
          // wx.navigateTo({
          //   url: `/pages/dogs/index`
          // })
          page.setData({resetForm: true})
          console.log('from upload, res',res)
          console.log('from upload, page.data', page.data)
        }
      })
    },

    listenerBtnChooseImage: function () {
      const page = this
      page.setData({resetForm: false})
      // Upload an image
      wx.chooseMedia({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          console.log('res.tempFiles', res.tempFiles)
          console.log('image upload success, res', res)
          page.setData({
            src: res.tempFiles[0].tempFilePath
            // src: res.tempFilePaths
          })
        }
      })
     },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
      wx.setStorageSync('new', true)
      console.log('form onLoad, options -> ', options)
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
      // TO-DO: set tabbar page

      const page = this
      console.log("form onShow")
      let { formData } = page.data
      console.log('success onShow, page.data', page.data)
      // comment out for now
      // if (this.data.resetData) this.resetData()
      if(wx.getStorageSync('new')) {
        page.setData({formData})
      }

      const id = wx.getStorageSync('editedId');
      if (id) {
        console.log('id found');
        wx.request({
          header: app.globalData.header,
          url: `${app.globalData.baseUrl}dogs/${id}`,
          success(res) {
            let data = res.data
            console.log('success from onShow, data ->', data)
            console.log('res from onShow ->', res);
            page.setData({
              formData: res.data,
              editedId: id,
              src: res.data.image
            });
            wx.removeStorageSync('editedId');
          }
        });
      }
    },
    
    // resets (clear) the form
    resetForm() {
      this.setData({formData: {}})
    },

    // not used
    inputName(e) {
      this.onChange('inputName', e)
    },
    inputAge(e) {
      this.onChange('inputAge', e)
    },
    inputBio(e) {
      this.onChange('inputBio', e)
    },

    // set input data of name, age, bio
    setInputData(e) {
      let {formData} = this.data
      formData[e.currentTarget.dataset.field] = e.detail.value
      const { field } = e.currentTarget.dataset
      this.setData({formData})
      // formData[field] = value;
    },

    // neutered switch
    onSwitchNeutered(e) {
      console.log('e.detail.value from SwitchNeutered', e.detail.value)
      this.onChange('neutered', e)
      // this.onChange('switchNeutered', e)
    },
    // vaccinated switch
    onSwitchVaccinated(e) {
      console.log('e.detail.value from SwitchVaccinated', e.detail.value)
      this.onChange('vaccinated', e)
    },
    // this method sets data when input Neutered, Vaccinated
    onChange(field, e) {
      let { formData } = this.data
      formData[field] = e.detail.value
      this.setData({
        [field]: e.detail.value,
        formData
      })
      console.log('from onChange, formData', formData)
      console.log('from onChange, e', e)
    },

    // set value for picker select breed, gender
    // setValue(values, key, field) {
    //   let { formData } = this.data
    //   formData[field] = values.value
    //   this.setData({
    //     [`value${key}`]: values.value,
    //     formData
    //   })
    // },

    // breed picker
    onBreedChange(e) {
      console.log('e from breedchange', e)
      let { formData } = this.data
      console.log("-----old formdata-------")
      console.log(formData)
      let { field } = e.currentTarget.dataset
      console.log("-----field-----")
      console.log(field)
      formData[field] = e.detail.value
      // formData[e.detail.value] = e.detail.value
      this.setData({
        formData:{
          ...formData,
          [field]: this.data.breed[e.detail.value]
        },
        breedSelected: this.data.breed[e.detail.value]
     
      })
      console.log('formData from breed change', formData)
      console.log('this.data.breed', this.data.breed)
      console.log('e.detail.value', e.detail.value)
    },
    // gender picker
    onGenderChange(e) {
      console.log('e from genderchange', e)
      let { formData } = this.data
      console.log('this.data', this.data)
      let { field } = e.currentTarget.dataset
      formData[field] = e.detail.value
      // formData[e.detail.value] = e.detail.value
      this.setData({
        formData:{
          ...formData,
          [field]: this.data.gender[e.detail.value]
        },
        genderSelected: this.data.gender[e.detail.value]
      })
      console.log('formData from gender change', formData)
      console.log('this.data.gender', this.data.gender)
      console.log('e.detail.value', e.detail.value)
    },

    // not used - picker confirm sets the value
    onConfirm(e) {
      // const { index } = e.currentTarget.dataset
      // this.setValue(e.detail)
      console.log(`onConfirm${index}`, e.detail)
      console.log('from picker onConfirm, e', e)
    },

    // not used
    bindBreedChange(e) {
      console.log('e from bindBreedChange', e)
      console.log('picker sends breed selection change, carries value of: ', e.detail.value)
      let { formData } = this.data;
      const { field } = e.currentTarget.dataset

      if ( field == 'breed') {
        formData.breed = e.detail.value
        const breedSelected = e.detail.value
        this.setData({ formData, breedSelected })
      }

      let page = this
      page.setData({resetForm:false})

      formData['dogIndex'] = e.detail.value;
      this.setData({ formData });
    },

    // not used
    bindGenderChange(e) {
      console.log('e from bindGenderChange', e)
      console.log('picker sends gender selection change, carries value of: ', e.detail.value)
      let { formData } = this.data;
      const { field } = e.currentTarget.dataset

      if ( field == 'gender') {
        formData.gender = e.detail.value
        const genderSelected = e.detail.value
        this.setData({ formData, genderSelected })
      }

      let page = this
      page.setData({resetForm:false})

      formData['dogIndex'] = e.detail.value;
      this.setData({ formData });
    },

    // saves the form input
    save(e) {
      wx.setStorageSync('new', true)
      console.log('e from save btn --> ', e)
      // Post data to API
      const page = this;
      console.log('header from save btn: ', app.globalData.header)
      let dog = page.data.formData
      console.log("---------dog send-----------")
      console.log(dog)
      console.log("---------------------------")

      console.log('from save btn, page.data ->', page.data)
      page.setData({dog})
      // const event = e.detail.value;
      // event.owner_id = 1;
  
      // if dog id exists, edit this form
      if (page.data.editedId !== undefined && page.data.editedId !== null) {
        wx.request({
          header: app.globalData.header,
          url: `${app.globalData.baseUrl}dogs/${page.data.editedId}`,
          method: 'PUT',
          data: { 
            dog: dog, 
            owner_id: app.globalData.owner.id
          },
          success(res) {
            console.log('update success? ', res)
            page.upload(page.data.editedId)
            page.setData({resetForm: true})
            wx.switchTab({
              url: '/pages/dogs/index',
            })
          }
        });
      } else {
        // if dog id doesn't exist, create new form
        console.log('Create: new dog ', dog)
        console.log('this data to send ->', page.data.dog)
        console.log('this owner_id to send ->',  app.globalData.owner.id)
        wx.request({
          header: app.globalData.header,
          url: `${app.globalData.baseUrl}dogs/`,
          method: 'POST',
          data: { 
            dog: {
              ...dog,
              owner_id: app.globalData.owner.id
            },       
          },
          success(res) {
            console.log('create success?', res)
            if (res.statusCode === 422) {
              wx.showModal({
                title: 'Sorry, please try again',
                content: res.data.errors.join(', '),
                showCancel: false,
                confirmText: 'OK'
              })
            } else if (res.statusCode === 500) {
              wx.showModal({
                title: 'Sorry, please try again',
                showCancel: false,
                confirmText: 'OK'
              })
            } else {
              wx.showToast({
                title: 'Dog Created!',
                duration: 2000,
                success(resolve) {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: `/pages/dogs/show?=${page.data.id}`
                    })
                  })
                }
              })
              // call the upload
              const id = res.data.id
              page.setData({resetForm: true})
              page.upload(id)
            }
          },
          fail(error) {
            console.log({error})
          }
        });
      }
    },

    // uploads the image to dogs/id/upload
    upload(id) {
      const page = this
      wx.uploadFile({
        url: `${app.globalData.baseURL}dogs/${id}/upload`,
        filePath: page.data.src[0],
        header: app.globalData.header,
        name: 'image',
        success (res) {
          wx.navigateTo({
            url: `/pages/dogs/index`
          })
          page.setData({resetForm: true})
          console.log('res from upload', res)
        }
      })
    }
})
             