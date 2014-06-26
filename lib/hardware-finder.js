module.exports = function(five, type, pin) {
  if(!five[type] || !five[type].instances) {
    return null
  }

  var output

  five[type].instances.forEach(function(thing) {
    if(thing.pin == pin) {
      output = thing
    }
  })

  return output
}
