const dayjs = require('dayjs');

module.exports = {
  formatDate: function (date, format) {
    return dayjs(date).format(format);
  },

  tags: function(tags) {
    return tags.filter(t => t !== 'post');
  },

  obfuscate: function (str) {
    const chars = [];

    for (let i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  }
}