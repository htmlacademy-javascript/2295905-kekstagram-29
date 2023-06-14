// String
function isSmallerThanLength(text, length) {
  return text.length < length;
}

isSmallerThanLength('проверяемая строка', 18);

// Palindrome

function isPalindrome(string) {
  const optimizeString = string.toLowerCase().replaceAll(' ', '');

  return optimizeString === optimizeString.split('').reverse().join('');
}

isPalindrome('комок');
