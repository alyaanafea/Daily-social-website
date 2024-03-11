export default function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678912345678901234567890123456789";
  let randomId = "";
  for (let i = 0; i < 10; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomId;
}

// Example usage:
const randomId = generateRandomId();
console.log(randomId);
