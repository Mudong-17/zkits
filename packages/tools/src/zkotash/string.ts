const CASE_SPLIT_PATTERN =
  /\p{Lu}?\p{Ll}+(?:['’]\p{Lu}?\p{Ll}+)*|[\(\)\[\]\{\}"'`~!@#$%^&*+=|\\:;,.<>/?]+|[0-9]+(?:\.\d+)?(?:km|m|cm|kg|g|ml|l|h|min|s)?|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+|(?:i\.e\.|e\.g\.|etc\.|etc|Mr\.|Mrs\.|Ms\.)|\p{Script=Han}+/gu;

/**
 * Splits a string into words.
 *
 * @param str The string to split.
 * @returns An array of words.
 *
 * @example
 * splitWords('Hello World') // => ['Hello', 'World']
 * splitWords('camelCase_snake_case-kebabCase') // => ['camel', 'Case','snake', 'case', 'kebab', 'Case']
 * splitWords('camelCaseHTTPRequest🚀') // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
 * splitWords('enable 24H format') // => ['enable', '24', 'H', 'format']
 * splitWords('tooLegit2Quit') // => ['too', 'Legit', '2', 'Quit']
 * splitWords('I like fruits, e.g., apples and bananas.') // => ['I', 'like', 'fruits', ',', 'e.g.', 'apples', 'and', 'bananas', '.']
 * splitWords('She has high self-esteem and good well-being.') // => ['She', 'has', 'high','self-esteem', 'and', 'good', 'well-being', '.']
 * splitWords('Je suis étudiant and I like programming. 私は学生で、プログラミングが好きです。') // => ['Je','suis', 'étudiant', 'and', 'I', 'like', 'programming', '.', '私は', '学生で', 'プログラミングが', '好きです', '.']
 * splitWords('The distance is 10km and the weight is 5kg.') // => ['The', 'distance', 'is', '10km', 'and', 'the', 'weight', 'is', '5kg', '.']
 * splitWords("It's 5 o'clock in the afternoon.") // => ["It's", '5', "o'clock", 'in', 'the', 'afternoon', '.']
 * splitWords('The password is $%^&*()') // => ['The', 'password', 'is', '$%^&*()']
 */
export const splitWords = (str: string): string[] => {
  if (!str) {
    return [];
  }

  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
};

/**
 * Converts the first character of `str` to uppercase.
 *
 * @param str The string to convert.
 * @returns The string with the first character converted to uppercase.
 *
 * @example
 * upperFirst('hello') // => 'Hello'
 * upperFirst('HELLO') // => 'HELLO'
 * upperFirst('') // => ''
 */
export const upperFirst = (str: string): string => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts the first character of `str` to lowercase.
 *
 * @param str The string to convert.
 * @returns The string with the first character converted to lowercase.
 *
 * @example
 * lowerFirst('Hello') // => 'hello'
 * lowerFirst('') // => ''
 */
export const lowerFirst = (str: string): string => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * Capitalizes the first character of each word in `str`.
 *
 * @param str The string to capitalize.
 * @returns The string with the first character of each word capitalized.
 *
 * @example
 * capitalize('hello') // => 'Hello'
 * capitalize('HELLO') // => 'Hello'
 * capitalize('') // => ''
 */

export const capitalize = (str: string): string => {
  if (!str) {
    return "";
  }

  return upperFirst(str.toLowerCase());
};

/**
 * Capitalizes all the words in `str`.
 *
 * @param str The string to capitalize.
 * @returns The string with all the words capitalized.
 *
 * @example
 * caseUpper('hello') // => 'HELLO'
 * caseUpper('HELLO') // => 'HELLO'
 * caseUpper('HELLO world') // => 'HELLO WORLD'
 * caseUpper('') // => ''
 */
export const caseUpper = (str: string): string => {
  if (!str) {
    return "";
  }

  return splitWords(str)
    .map((word) => word.toUpperCase())
    .join(" ");
};

/**
 * Capitalizes all the words in `str`.
 *
 * @param str The string to capitalize.
 * @returns The string with all the words capitalized.
 *
 * @example
 * caseLower('Hello') // => 'hello'
 * caseLower('HELLO') // => 'hello'
 * caseLower('HELLO world') // => 'hello world'
 * caseLower('') // => ''
 */
export const caseLower = (str: string): string => {
  if (!str) {
    return "";
  }

  return splitWords(str)
    .map((word) => word.toLowerCase())
    .join(" ");
};

/**
 * Converts the first character of each word in a string to uppercase and the remaining characters to lowercase.
 *
 * @param str The string to convert.
 * @returns The string with the first character of each word capitalized and the remaining characters lowercase.
 *
 * @example
 * caseTitle('hello') // => 'Hello'
 * caseTitle('HELLO') // => 'Hello'
 * caseTitle('HELLO world') // => 'Hello World'
 * caseTitle('') // => ''
 */
export const caseTitle = (str: string): string => {
  if (!str) {
    return "";
  }

  return splitWords(str)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Converts a string to snake case.
 *
 * @param str The string to convert.
 * @returns The string in snake case.
 *
 * @example
 * caseSnake('hello') // => 'hello'
 * caseSnake('HELLO') // => 'hello'
 * caseSnake('HELLO world') // => 'hello_world'
 * caseSnake('') // => ''
 */
export const caseSnake = (str: string): string => {
  if (!str) {
    return "";
  }

  return splitWords(str)
    .map((word) => word.toLowerCase())
    .join("_");
};
