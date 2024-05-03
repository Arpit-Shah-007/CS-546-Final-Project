// export const checkId = (id, varName) => {
//   if (!id) throw `Error: You must provide a id for ${varName}`;
//   if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
//   return new ObjectId(id);
// };

// export const checkString = (str, varName) => {
//   if (!str) throw `Error: You must provide a ${varName}`;
//   if (typeof str !== "string") throw `Error: ${varName} must be a string!`;
//   str = str.trim();
//   if (str.length === 0)
//     throw `Error: ${varName} cannot be an empty string or string with just spaces!`;
//   if (!isNaN(str))
//     throw `Error: ${str} is not a valid value for ${varName} as it only contains digits`;
//   return str;
// };

// export const checkInput = (input, varName) => {
//   if (!input) throw `Error: You must provide a ${varName}`;
//   input = input.trim();
// };

// export const checkEmail = (email) => {
//   if (!email) throw "Error: must provide an email";
//   email = email.trim().toLowerCase();
//   let regex = /^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/;
//   if (regex.test(String(email).toLowerCase())) {
//     return email;
//   } else {
//     throw "Error: invalid email";
//   }
// };
