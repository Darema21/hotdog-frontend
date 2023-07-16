const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function goToShow(i) {
    console.log('ID:', i);

    wx.navigateTo({
      url: `/pages/dogs/show?id=${i}`,
    })
}

// function goToBreed(data) {
  
//     // Check if the data is an ID or a name
//     if (typeof data === 'number') {
//       // Data is an ID
//       wx.navigateTo({
//         url: `/pages/wiki/show?id=${data}`,
//       });
//     } else if (typeof data === 'string') {
//       // Data is a name
//       wx.navigateTo({
//         url: `/pages/wiki/show?name=${encodeURIComponent(data)}`,
//       });
//     }
//   }  

function goToBreed(e) {
    wx.navigateTo({
      url: `/pages/wiki/show?id=${e}`,
    })
}

module.exports = {
  formatTime,
  goToBreed
}
