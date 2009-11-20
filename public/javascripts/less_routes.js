function less_json_eval(json){return eval('(' +  json + ')')}  

function jq_defined(){return typeof(jQuery) != "undefined"}

function less_get_params(obj){
   
  if (jq_defined()) { return obj }
  if (obj == null) {return '';}
  var s = [];
  for (prop in obj){
    s.push(prop + "=" + obj[prop]);
  }
  return s.join('&') + '';
}

function less_merge_objects(a, b){
   
  if (b == null) {return a;}
  z = new Object;
  for (prop in a){z[prop] = a[prop]}
  for (prop in b){z[prop] = b[prop]}
  return z;
}

function less_ajax(url, verb, params, options){
   
  if (verb == undefined) {verb = 'get';}
  var res;
  if (jq_defined()){
    v = verb.toLowerCase() == 'get' ? 'GET' : 'POST'
    if (verb.toLowerCase() == 'get' || verb.toLowerCase() == 'post'){p = less_get_params(params);}
    else{p = less_get_params(less_merge_objects({'_method': verb.toLowerCase()}, params))} 
     
     
    res = jQuery.ajax(less_merge_objects({async:false, url: url, type: v, data: p}, options)).responseText;
  } else {  
    new Ajax.Request(url, less_merge_objects({asynchronous: false, method: verb, parameters: less_get_params(params), onComplete: function(r){res = r.responseText;}}, options));
  }
  if (url.indexOf('.json') == url.length-5){ return less_json_eval(res);}
  else {return res;}
}
function less_ajaxx(url, verb, params, options){
   
  if (verb == undefined) {verb = 'get';}
  if (jq_defined()){
    v = verb.toLowerCase() == 'get' ? 'GET' : 'POST'
    if (verb.toLowerCase() == 'get' || verb.toLowerCase() == 'post'){p = less_get_params(params);}
    else{p = less_get_params(less_merge_objects({'_method': verb.toLowerCase()}, params))} 
     
     
    jQuery.ajax(less_merge_objects({ url: url, type: v, data: p, complete: function(r){eval(r.responseText)}}, options));
  } else {  
    new Ajax.Request(url, less_merge_objects({method: verb, parameters: less_get_params(params), onComplete: function(r){eval(r.responseText);}}, options));
  }
}
function categories_path(format, verb){ return '/categories' + format + '';}
function categories_ajax(format, verb, params, options){ return less_ajax('/categories' + format + '', verb, params, options);}
function categories_ajaxx(format, verb, params, options){ return less_ajaxx('/categories' + format + '', verb, params, options);}
function new_category_path(format, verb){ return '/categories/new' + format + '';}
function new_category_ajax(format, verb, params, options){ return less_ajax('/categories/new' + format + '', verb, params, options);}
function new_category_ajaxx(format, verb, params, options){ return less_ajaxx('/categories/new' + format + '', verb, params, options);}
function edit_category_path(id, format, verb){ return '/categories/' + id + '/edit' + format + '';}
function edit_category_ajax(id, format, verb, params, options){ return less_ajax('/categories/' + id + '/edit' + format + '', verb, params, options);}
function edit_category_ajaxx(id, format, verb, params, options){ return less_ajaxx('/categories/' + id + '/edit' + format + '', verb, params, options);}
function category_path(id, format, verb){ return '/categories/' + id + '' + format + '';}
function category_ajax(id, format, verb, params, options){ return less_ajax('/categories/' + id + '' + format + '', verb, params, options);}
function category_ajaxx(id, format, verb, params, options){ return less_ajaxx('/categories/' + id + '' + format + '', verb, params, options);}
function products_path(format, verb){ return '/products' + format + '';}
function products_ajax(format, verb, params, options){ return less_ajax('/products' + format + '', verb, params, options);}
function products_ajaxx(format, verb, params, options){ return less_ajaxx('/products' + format + '', verb, params, options);}
function new_product_path(format, verb){ return '/products/new' + format + '';}
function new_product_ajax(format, verb, params, options){ return less_ajax('/products/new' + format + '', verb, params, options);}
function new_product_ajaxx(format, verb, params, options){ return less_ajaxx('/products/new' + format + '', verb, params, options);}
function edit_product_path(id, format, verb){ return '/products/' + id + '/edit' + format + '';}
function edit_product_ajax(id, format, verb, params, options){ return less_ajax('/products/' + id + '/edit' + format + '', verb, params, options);}
function edit_product_ajaxx(id, format, verb, params, options){ return less_ajaxx('/products/' + id + '/edit' + format + '', verb, params, options);}
function product_path(id, format, verb){ return '/products/' + id + '' + format + '';}
function product_ajax(id, format, verb, params, options){ return less_ajax('/products/' + id + '' + format + '', verb, params, options);}
function product_ajaxx(id, format, verb, params, options){ return less_ajaxx('/products/' + id + '' + format + '', verb, params, options);}
function root_path(verb){ return '';}
function root_ajax(verb, params, options){ return less_ajax('', verb, params, options);}
function root_ajaxx(verb, params, options){ return less_ajaxx('', verb, params, options);}
