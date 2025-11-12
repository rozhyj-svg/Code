// Browser generator (same algorithm as server-side)
(function(window){
  function generate(template, inputs){
    if(typeof template !== 'string') throw new Error('template must be a string');
    return template.replace(/\{([^}]+)\}/g, function(_, key){
      if(!(key in inputs)) throw new Error('missing input: ' + key);
      return String(inputs[key]);
    });
  }
  window.madlibGenerator = { generate };
})(this);
