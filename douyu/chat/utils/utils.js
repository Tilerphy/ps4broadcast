
var utils = {

	replaceAll: function(str, search, replacement) {
		if(str == null || str.length <= 0) {
			return "";
		}
	    return str.replace(new RegExp(search, 'g'), replacement);
	},

	escape: function(field) {
		if(!field || field.length <= 0) {
			return "";
		}
		field = "" + field
		field = utils.replaceAll(field, "@", "@A");
		field = utils.replaceAll(field, "/", "@S");
		return field;
	},

	unescape: function(field) {
		if(!field || field.length <= 0) {
			return "";
		}
		field = "" + field
		field = utils.replaceAll(field, "@S", "/");
		field = utils.replaceAll(field, "@A", "@");
		return field;
	},

	serialize: function serialize(data) {
		var kvPairs = [];
		for(var key in data) {
			if(!data.hasOwnProperty(key)) {
				continue;
			}

			kvPairs.push(utils.escape(key) + "@=" + utils.escape(data[key]));
		}
		return kvPairs.join("/") + "/";
	},

	deserialize: function(raw) {
		var result = {};
		var kvPairs = raw.split("/");
		kvPairs.forEach(function(kvStr){
			var kv = kvStr.split("@=");
			if(kv.length != 2) {
				return;
			}
			var key = utils.unescape(kv[0]);
			var value = utils.unescape(kv[1]);
			if(value.indexOf("@=") >= 0) {
				value = utils.deserialize(value);
			}
			result[key] = value;
		});
		return result;
	},
};

module.exports = utils;