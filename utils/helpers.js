module.exports = {
  section: function(name, options) {
    if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },

    join: function (string) {
      let array = JSON.parse(string)
      return array.join (', ')
    },

    pick3: function (string) {
      let array = string.split(',')
      return array[0] + ', ' + array[1] + ', ' + array[2]
    },

    darkenColor: function (color, increase) {
      let array = color.split('-')
      return array[0] + '-' + (parseInt(array[1]) + increase)
    },

    evalIf: function (one, comparator, two) {
      if (eval(one + comparator + two)) {
        return true
      } else {
        return false
      }
    },

    blankify: function (string) {
      return string.replace('<BLANK>', '_____')
    }
};
