var isArray = require('util').isArray

module.exports.toJavascript = toJavascript
module.exports.toDDB = toDDB

/**
 * converts a ddb object into a js object
 *
 */
function toJavascript(data, mergeInto) {
	var result = mergeInto || {}
	var keys = Object.keys(data)

	for (var i = 0; i < keys.length; i++) {
		var p = keys[i]
			
		result[p] = toJsValue(data[p])
	}

	return result
}

/**
 * converts a js object into a ddb object
 *
 */
function toDDB(data, mergeInto) {
	var result = mergeInto || {}
	var keys = Object.keys(data)

	for (var i = 0; i < keys.length; i++) {
		var p = keys[i]
			
		result[p] = toDDBValue(data[p])
	}

	return result
}

function toJsValue(entry) {
	var types = Object.keys(entry)
	
	// TODO maybe it would be better to create a property with undefined value for this ?
	if (types.length === 0) throw new Error('missing type for ' + entry)

	var type = types[0]
	var val = entry[type]

	if (type === 'NULL' && val === true) {
		return null
	}

	if (type === 'N') {
		return Number(val)
	}

	if (type === 'M') {
		return toJavascript(val)
	}

	if (type === 'L') {		
		return toJsArray(val)
	}

	return val
}

function toJsArray(arr) {

	var val = new Array(arr.length)

	for (var x = 0; x < arr.length; x++) {
		val[x] = toJsValue(arr[x])
	}

	return val
}

function toDDBValue(val) {
	if (typeof val === 'string') {
		return { S: val }
	}

	if (typeof val === 'number') {
		return { N: val.toString() }
	}

	if (typeof val === 'boolean') {
		return { BOOL: val }
	}

	if (isArray(val)) {
		var result = new Array(val.length)

		for (var i = 0; i < result.length; i++) {
			result[i] = toDDBValue(val[i])
		}

		return { L: result }
	}

	// TODO add checks for regexp, date and others
	// then throw if needed

	if (typeof (val) === 'object') {
		return { M: toDDB(val) }
	}
}
