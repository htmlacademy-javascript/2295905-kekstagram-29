function isSmallerThanLength(text, length) {
  return text.length < length;
}

// Palindrome

function isPalindrome(string) {
  return (
    string.toLowerCase() ===
    string.replaceAll(" ", "").toLowerCase().split("").reverse().join("")
  );
}
