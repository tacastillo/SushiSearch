/**
 * Created by Timothy on 10/18/15.
 */

module.exports.capitalize = function(word) {
    return word.toLowerCase().replace(/\b\w/g, function(ch) {
        return ch.toUpperCase()
    })
}