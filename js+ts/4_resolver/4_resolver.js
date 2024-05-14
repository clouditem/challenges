
/**
 * Creates a resolved_object: 
 * an Object that when asked for resolved_object[key] returns the result of resolver[key](resolved_object).
 * the function should only be called once, no matter how often resolved_object[key] is called.
 * you may assume that cyclic dependencies do not exist
 * @param {{[x:string]:(resolved_object:{[x:string]:any})=>any}} resolver
 * @returns {{[x:string]:any}}
 */
const resolve = (resolver) => {

};

require('../util/_test')({
  like_lazy_object: (t) => t.deepStrictEqual(resolve({foo:()=>1,bar:()=>'bar'}), {foo:1,bar:'bar'}),
  can_access_other_properties_1: (t) => t.deepStrictEqual(resolve({foo:()=>1,bar:({foo})=>foo+5}), {foo:1,bar:6}),
  can_access_other_properties_2: (t) => t.deepStrictEqual(resolve({header_text:()=>'this is a header',header:({header_text})=>`<header>${header_text}</header>`}), {header_text:'this is a header',header: '<header>this is a header</header>'}),
  can_access_other_properties_3: (t) => t.deepStrictEqual(resolve({a:()=>'a',b:({a})=>a+'b',c:({a,b})=>a+b,d:({a,b,c})=>a+c+b}), {a:'a',b:'ab',c:'aab',d:'aaabab'}),
  function_is_only_called_once: (t) => {
    const resolved_object=resolve({called_only_once:()=>({})});
    return t.strictEqual(resolved_object.called_only_once,resolved_object.called_only_once,'function was called twice');
  },
  functions_are_only_called_when_accessed: (t) => {
    const resolved_object=resolve({throws_error:()=>{throw Error('should only be called when value is accessed')}});
    return t.throws(()=>resolved_object.throws_error);
  },
})