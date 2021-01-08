module.exports = {
  section: function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },

  join: function (string) {
    const array = JSON.parse(string);
    return array.join(', ');
  },

  pick3: function (string) {
    const array = string.split(',');
    return array[0] + ', ' + array[1] + ', ' + array[2];
  },

  darkenColor: function (color, increase) {
    const array = color.split('-');
    return array[0] + '-' + (parseInt(array[1]) + increase);
  },

  q: function (one, comparator, two) {
    if (eval(one + comparator + two)) {
      return true;
    } else {
      return false;
    }
  },

  blankify: function (string) {
    return string.replace('<BLANK>', '_____');
  },

<<<<<<< HEAD
=======
  stringify: function (data) {
    return JSON.stringify(data);
  },

>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
  countDown: function (startTime, timeAllowed) {
    return Math.ceil((timeAllowed - (Date.now() - startTime) / 1000));
  }
};
