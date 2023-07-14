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

function goToBreed(id) {
  console.log('ID:', id)
  wx.navigateTo({
      url: `/pages/wiki/show?id=${id}`,
  })
}

module.exports = {
  formatTime,
  goToBreed
}
