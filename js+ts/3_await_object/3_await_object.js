/**
 * create an Object in which all Promise properties are replaced by their resolved values. 
 * any failed promise fails the entire function
 * @param {any} object
 * @returns {Promise<any>}
 */
const await_object = async (object) => {

};


require('../util/_typescript_test')({
  correctly_typed: async () => {
    const want = {
      foo: 1,
      bar: '',
    };
    let have = await await_object({
      foo: Promise.resolve(1),
      bar: Promise.resolve(''),
    })
    have = want;

  },
  not_any_return: async () => {
    let have = await await_object({
      foo: Promise.resolve(1),
    })
    //@ts-expect-error
    have = {};
    //@ts-expect-error
    have = { foo: '' };

  },
  handles_arrays: async () => {
    let have = await await_object({
      foo: [Promise.resolve(false), true],
    });
    //@ts-expect-error
    have = { foo: [Promise.resolve(false)] };
    have = { foo: [false] };
  }
})

require('../util/_test')({
  single_property: async (t) => t.deepStrictEqual(
    await await_object({ foo: Promise.resolve(1) }),
    { foo: 1 },
  ),
  multiple_property: async (t) => t.deepStrictEqual(
    await await_object({ foo: Promise.resolve(false), bar: Promise.resolve('') }),
    { foo: false, bar: '' },
  ),
  nested: async (t) => t.deepStrictEqual(
    await await_object({ a: { b: { c: Promise.resolve('value') } } }),
    { a: { b: { c: 'value' } } },
  ),
  can_handle_array: async (t) => t.deepStrictEqual(
    await await_object({ array: [false, true, Promise.resolve(false), Promise.resolve(true)] }),
    { array: [false, true, false, true] },
  ),
  rejects_with_error: async (t) => {
    const error = Error('test');
    return t.deepStrictEqual(
      await await_object({ fail: Promise.reject(error) }).catch(err => err),
      error,
    );
  },
})