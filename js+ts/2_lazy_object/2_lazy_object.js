
/**
 * create an Object that calls the provided Functions when the corresponding properties are called
 * @param {any} object_with_functions
 * @returns {any}
 */
const lazy_object = (object_with_functions) => {

};

require('../util/_typescript_test')({
  correctly_typed: () => {
    const want = {
      foo: 1,
      bar: '',
    };
    let have = lazy_object({
      foo: () => 1,
      bar: () => '',
    })
    have = want;

  },
  not_any_return: () => {
    let have = lazy_object({
      foo: () => 1,
      bar: () => '',
    })
    //@ts-expect-error
    have = {};

  }
})

require('../util/_test')({
  return_is_result_of_function_call: (t) => t.deepStrictEqual(lazy_object({ foo: () => 'test' }).foo,'test'),
  result_is_enumerable: (t) => t.deepStrictEqual(lazy_object({ foo: () => 'test' }), { foo: 'test' }),
  function_is_only_called_when_value_is_accessed: (t) => {
    const have= lazy_object({fail: ()=>{throw Error('Should not be called early')}});
    let error;
    try{
      have.fail;
    }catch(err){
      error=err;
    }
    return t.strictEqual(error?.message,'Should not be called early');
  },
})