// index.js

// Step 0: Import datejs
require('datejs');

/**
 * Step 1: Create the combineUsers function with rest arguments
 * @param  {...Array} args - An indeterminate amount of arrays containing strings
 */
function combineUsers(...args) {
  // Step 2: Initialize the Return Object
  const combinedObject = {
    users: []
  };

  // Step 3 & 4: Loop through args to isolate each array
  args.forEach(userArray => {
    // Step 4: Merge arrays using the spread operator
    combinedObject.users = [...combinedObject.users, ...userArray];
  });

  // Step 5: Get today's date formatted as M/d/yyyy
  combinedObject.merge_date = Date.today().toString('M/d/yyyy');

  // Step 7: Return the object
  return combinedObject;
}

// ✅ Export for Jest testing
module.exports = { combineUsers };

