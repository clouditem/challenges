/**
 * @param {{[x:string]:(t:import('assert/strict'))=>any}} test_functions
 */
module.exports=async (test_functions)=>{
  const assert = require('assert/strict');
  const settled_tests = await Promise.allSettled(Object.entries(test_functions).map(async ([name,test]) => {
    try{
      test(assert)
      return name;
    } catch(err){
      err.message = `${name}: ${err.message}`;
      throw err;
    }
  }));
  settled_tests.forEach(test => {
    if (test.status === 'rejected')
      console.log(test.reason instanceof assert.AssertionError ? test.reason.message :test.reason)
    else
      console.log(test.value, 'SUCCESS')
  });
}