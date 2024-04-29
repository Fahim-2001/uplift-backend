function getDateTime() {
    const now = new Date();
  
    let dayOfMonth = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-based, so we add 1
    let year = now.getFullYear();
  
    let hours = now.getHours();
    let minutes = now.getMinutes();
  
    // Pad single digit day/month/hours/minutes with leading zero
    dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${dayOfMonth}/${month}/${year} - ${hours}:${minutes}`;
  }

module.exports = {
    getDateTime
}