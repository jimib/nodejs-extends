String.injectParam = function(str, param, value){
	var regexp = new RegExp(":"+param, "g");
	return str.toString().replace(regexp, value);
}

String.capitalize = function(str){
	return str.length > 0 ? str.substr(0,1).toUpperCase() + str.substr(1) : str.toString();
};

String.injectValue = function(str, param, value){
		var regexp = new RegExp("#\{"+param+"\}", "g");
		return str.toString().replace(regexp, value);
}

String.injectObject = function(str, data){
	for(var i in data){
		str = String.injectValue(str, i, data[i]);
	}
	return str;
}

Array.clone = function(arr){
	return arr.slice(0, arr.length);
}

Array.ensureIsArray = function(arr){
	arr = arr || [];
	arr = Array.isArray(arr) ? arr : [arr];
	return arr;
}

Array.forEachAsync = function(arr, action, cb){
	var self = arr;
	var i = - 1;
	var lim = Array.isArray(arr) ? arr.length : 0;

	next();

	function next(){
		if(++i < lim){
			action(self[i], function(err, result){
				//self[i] = result || self[i];//? - WHAT IS THIS LINE DOING - NO IDEA COMMENTED OUT
				next();
			});
		}else{
			cb();
		}
	}
}

Array.addUniqueItem = function(arr, item){
	try{
		if(Array.isArray(arr) && arr.indexOf(item) == -1){
			arr.push(item);
			return true;
		}
	}catch(err){
		
	}
	return false;
}

Array.hasItem = function(arr, item){
	try{
		return arr.indexOf(item) > -1 ? true : false;
	}catch(err){
		
	}
	
	return false;
}

Array.removeItem = function(arr, item){
	try{
		if(Array.isArray(arr)){
			var index = arr.indexOf(item);
			console.log("Removing item: ", index);
			if(index != -1){
				arr.splice(index, 1);
				return true;
			}
		}
	}catch(err){
		console.log("Error removing item:", err);
	}
	return false;
}

Object.merge = function(a, b, boolOverride){
	if(boolOverride == undefined){
		boolOverride = false;
	}

	for(var i in b){
		if(boolOverride || a[i] == undefined)
		{
			a[i] = b[i];
		}
	}
}

Object.forEachAsync = function(obj, action, cb){
	var arr = [];
	var cnt = 0;
	for(var i in obj){
		arr[cnt++] = i;
	}
	
	var self = arr;
	var i = - 1;
	var lim = Array.isArray(arr) ? arr.length : 0;

	next();

	function next(){
		if(++i < lim){
			var id = self[i];
			action(id, obj[id], function(err, result){
				//self[i] = result || self[i];//? - WHAT IS THIS LINE DOING - NO IDEA COMMENTED OUT
				next();
			});
		}else{
			cb();
		}
	}
}

//extend today
Date.nowUTC = function(){
	var now = new Date();
	var now_utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return now_utc;
}

Date.today = function(){
	var date = Date.nowUTC();
	
	date.setUTCHours(0);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	
	return date;
}

var DAY = 1000 * 60 * 60 * 24;

Date.tomorrow = function(){
	var date = Date.today();
	date.setTime(date.getTime() + 1 * DAY);
	return date;
}

Date.yesterday = function(){
	var date = Date.today();
	date.setTime(date.getTime() - 1 * DAY);
	return date;
}

try{
	//try to extends uberclass
	var Class = require("uberclass");
	var events = require("events");

	Class.util = {
		ExposeMethods : function(methods, target){
			var result = {};

			methods.forEach(function(method){
				//link the methods
				result[method] = function(){
					target[method].apply(target, arguments);
				}
			});

			return result;
		}
	}

	Class.EventEmitterClass = Class.extend({},{
		init : function(){
			this.emitter = new events.EventEmitter();
		},
		addListener : function(evt, cb){
			this.emitter.addListener(evt, cb);
		},
		on : function(evt, cb){
			this.emitter.on(evt, cb);
		},
		once : function(evt, cb){
			this.emitter.once(evt, cb);
		},
		removeListener : function(evt, cb){
			this.emitter.removeListener(evt, cb);
		},
		removeAllListeners : function(evt){
			this.emitter.removeAllListeners(evt);
		},
		setMaxListeners : function(n){
			this.emitter.setMaxListeners(n);
		},
		listeners : function(evt){
			return this.emitter.listeners(evt);
		},
		emit : function(evt, cb){
			this.emitter.emit(evt, cb);
		}
	});
	
}catch(err){
	console.log("Unable to extend uberclass");
}

