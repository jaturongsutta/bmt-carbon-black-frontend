const key = "SecretKey01";

export const xorEncryptDecrypt = (input) => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return output;
};

// // Encrypt
// const encrypted = xorEncryptDecrypt(originalString, key);
// console.log("Encrypted:", encrypted);

// // Decrypt
// const decrypted = xorEncryptDecrypt(encrypted, key);
// console.log("Decrypted:", decrypted);
