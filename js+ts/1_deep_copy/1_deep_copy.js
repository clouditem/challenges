
/**
 * Creates a deep copy of a simple object
 * @param {any} object_to_copy
 * @returns {any}
 */
const deep_copy = (object_to_copy) => {

};

require('../util/_typescript_test')({
  not_any_return:()=>{
      /**@type {'SOME RANDOM VALUE'} */
      let value = 'SOME RANDOM VALUE';
      let copied_value = deep_copy(value);
      value = copied_value;
      copied_value = value;
      /**@type {'SOME OTHER RANDOM VALUE'} */
      //@ts-expect-error
      let some_other_value = copied_value;
      some_other_value;
  }
})

require('../util/_test')({
  string: (t) => t.strictEqual(deep_copy(" "), " "),
  number: (t) => t.strictEqual(deep_copy(5), 5),
  not_identical: (t) => { const val = {}; t.notStrictEqual(deep_copy(val), val) },
  depth_1: (t) => t.deepStrictEqual(deep_copy({ foo: 'bar',baz:'bam' }), { foo: 'bar',baz:'bam' }),
  deep: (t) => t.deepStrictEqual(deep_copy({ depth: { 1: { 2: { 3: { 4: { 5: false } } } } } }), { depth: { 1: { 2: { 3: { 4: { 5: false } } } } } }),
})