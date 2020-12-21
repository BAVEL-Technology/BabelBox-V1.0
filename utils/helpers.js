module.exports = {
  section: function(name, options) {
    if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },

    join: function (string) {
      let array = JSON.parse(string)
      return array.join (', ')
    }
};
