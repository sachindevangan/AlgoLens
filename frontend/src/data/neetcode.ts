export type Problem = {
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  functionName: string;
  starterCode: string;
  testCases: {
    args: string;
    expected: string;
  }[];
};

type RawProblem = Omit<Problem, "functionName" | "testCases" | "starterCode">;

const RAW_NEETCODE_PROBLEMS: Record<string, RawProblem[]> = {
  "arrays-hashing": [
    {
      "slug": "two-sum",
      "title": "Two Sum",
      "difficulty": "easy",
      "description": "Given an array of integers nums and an integer target , return indices of the two numbers such that they add up to target . You may assume that each input would have exactly one solution , and you may not use the same element twice. You can return the answer in any order.",
      "examples": [
        {
          "input": "nums = [2,7,11,15], target = 9",
          "output": "[0,1]",
          "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          "input": "nums = [3,2,4], target = 6",
          "output": "[1,2]"
        }
      ],
      "constraints": [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ]
    },
    {
      "slug": "valid-sudoku",
      "title": "Valid Sudoku",
      "difficulty": "medium",
      "description": "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules : Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition.",
      "examples": [
        {
          "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"] ,[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"] ,[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"] ,[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"] ,[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"] ,[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"] ,[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"] ,[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"] ,[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
          "output": "true"
        },
        {
          "input": "board = [[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"] ,[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"] ,[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"] ,[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"] ,[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"] ,[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"] ,[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"] ,[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"] ,[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
          "output": "false",
          "explanation": "Same as Example 1, except with the 5 in the top left corner being modified to 8 . Since there are two 8's in the top left 3x3 sub-box, it is invalid."
        }
      ],
      "constraints": [
        "board.length == 9",
        "board[i].length == 9",
        "board[i][j] is a digit 1-9 or '.' ."
      ]
    },
    {
      "slug": "group-anagrams",
      "title": "Group Anagrams",
      "difficulty": "medium",
      "description": "Given an array of strings strs , group the anagrams together. You can return the answer in any order .",
      "examples": [
        {
          "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
          "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
          "explanation": "There is no string in strs that can be rearranged to form \"bat\" . The strings \"nat\" and \"tan\" are anagrams as they can be rearranged to form each other. The strings \"ate\" , \"eat\" , and \"tea\" are anagrams as they can be rearranged to form each other."
        },
        {
          "input": "strs = [\"\"]",
          "output": "[[\"\"]]"
        }
      ],
      "constraints": [
        "1 <= strs.length <= 10^4",
        "0 <= strs[i].length <= 100",
        "strs[i] consists of lowercase English letters."
      ]
    },
    {
      "slug": "longest-consecutive-sequence",
      "title": "Longest Consecutive Sequence",
      "difficulty": "medium",
      "description": "Given an unsorted array of integers nums , return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
      "examples": [
        {
          "input": "nums = [100,4,200,1,3,2]",
          "output": "4",
          "explanation": "The longest consecutive elements sequence is [1, 2, 3, 4] . Therefore its length is 4."
        },
        {
          "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
          "output": "9"
        }
      ],
      "constraints": [
        "0 <= nums.length <= 10^5",
        "-10^9 <= nums[i] <= 10^9"
      ]
    },
    {
      "slug": "contains-duplicate",
      "title": "Contains Duplicate",
      "difficulty": "easy",
      "description": "Given an integer array nums , return true if any value appears at least twice in the array, and return false if every element is distinct.",
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "true",
          "explanation": "The element 1 occurs at the indices 0 and 3."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "false",
          "explanation": "All elements are distinct."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^5",
        "-10^9 <= nums[i] <= 10^9"
      ]
    },
    {
      "slug": "product-of-array-except-self",
      "title": "Product of Array Except Self",
      "difficulty": "medium",
      "description": "Given an integer array nums , return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i] . The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "[24,12,8,6]"
        },
        {
          "input": "nums = [-1,1,0,-3,3]",
          "output": "[0,0,9,0,0]"
        }
      ],
      "constraints": [
        "2 <= nums.length <= 10^5",
        "-30 <= nums[i] <= 30",
        "The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer."
      ]
    },
    {
      "slug": "valid-anagram",
      "title": "Valid Anagram",
      "difficulty": "easy",
      "description": "Given two strings s and t , return true if t is an anagram of s , and false otherwise.",
      "examples": [
        {
          "input": "s = \"anagram\", t = \"nagaram\"",
          "output": "true"
        },
        {
          "input": "s = \"rat\", t = \"car\"",
          "output": "false"
        }
      ],
      "constraints": [
        "1 <= s.length, t.length <= 5 * 10^4",
        "s and t consist of lowercase English letters."
      ]
    },
    {
      "slug": "encode-and-decode-strings",
      "title": "Encode and Decode Strings",
      "difficulty": "medium",
      "description": "Design an algorithm to encode a list of strings to a string . The encoded string is then sent over the network and is decoded back to the original list of strings. Machine 1 (sender) has the function: string encode(vector strs) { // ...",
      "examples": [
        {
          "input": "dummy_input = [\"Hello\",\"World\"]",
          "output": "[\"Hello\",\"World\"]",
          "explanation": "Machine 1: Codec encoder = new Codec(); String msg = encoder.encode(strs); Machine 1 ---msg---> Machine 2 Machine 2: Codec decoder = new Codec(); String[] strs = decoder.decode(msg);"
        },
        {
          "input": "dummy_input = [\"\"]",
          "output": "[\"\"]"
        }
      ],
      "constraints": [
        "1 <= strs.length <= 200",
        "0 <= strs[i].length <= 200",
        "strs[i] contains any possible characters out of 256 valid ASCII characters."
      ]
    },
    {
      "slug": "top-k-frequent-elements",
      "title": "Top K Frequent Elements",
      "difficulty": "medium",
      "description": "Given an integer array nums and an integer k , return the k most frequent elements . You may return the answer in any order .",
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3], k = 2",
          "output": "[1,2]"
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
        "k is in the range [1, the number of unique elements in the array] .",
        "It is guaranteed that the answer is unique ."
      ]
    }
  ],
  "two-pointers": [
    {
      "slug": "container-with-most-water",
      "title": "Container With Most Water",
      "difficulty": "medium",
      "description": "You are given an integer array height of length n . There are n vertical lines drawn such that the two endpoints of the i^th line are (i, 0) and (i, height[i]) . Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      "examples": [
        {
          "input": "height = [1,8,6,2,5,4,8,3,7]",
          "output": "49",
          "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
        },
        {
          "input": "height = [1,1]",
          "output": "1"
        }
      ],
      "constraints": [
        "n == height.length",
        "2 <= n <= 10^5",
        "0 <= height[i] <= 10^4"
      ]
    },
    {
      "slug": "3sum",
      "title": "3Sum",
      "difficulty": "medium",
      "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j , i != k , and j != k , and nums[i] + nums[j] + nums[k] == 0 . Notice that the solution set must not contain duplicate triplets.",
      "examples": [
        {
          "input": "nums = [-1,0,1,2,-1,-4]",
          "output": "[[-1,-1,2],[-1,0,1]]",
          "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter."
        },
        {
          "input": "nums = [0,1,1]",
          "output": "[]",
          "explanation": "The only possible triplet does not sum up to 0."
        }
      ],
      "constraints": [
        "3 <= nums.length <= 3000",
        "-10^5 <= nums[i] <= 10^5"
      ]
    },
    {
      "slug": "trapping-rain-water",
      "title": "Trapping Rain Water",
      "difficulty": "hard",
      "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1 , compute how much water it can trap after raining.",
      "examples": [
        {
          "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          "output": "6",
          "explanation": "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
        },
        {
          "input": "height = [4,2,0,3,2,5]",
          "output": "9"
        }
      ],
      "constraints": [
        "n == height.length",
        "1 <= n <= 2 * 10^4",
        "0 <= height[i] <= 10^5"
      ]
    },
    {
      "slug": "valid-palindrome",
      "title": "Valid Palindrome",
      "difficulty": "easy",
      "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s , return true if it is a palindrome , or false otherwise .",
      "examples": [
        {
          "input": "s = \"A man, a plan, a canal: Panama\"",
          "output": "true",
          "explanation": "\"amanaplanacanalpanama\" is a palindrome."
        },
        {
          "input": "s = \"race a car\"",
          "output": "false",
          "explanation": "\"raceacar\" is not a palindrome."
        }
      ],
      "constraints": [
        "1 <= s.length <= 2 * 10^5",
        "s consists only of printable ASCII characters."
      ]
    },
    {
      "slug": "two-sum-ii-input-array-is-sorted",
      "title": "Two Sum II Input Array Is Sorted",
      "difficulty": "medium",
      "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order , find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index 1 ] and numbers[index 2 ] where 1 <= index 1 < index 2 <= numbers.length . Return the indices of the two numbers index 1 and index 2 , each incremented by one, as an integer array [index 1 , index 2 ] of length 2.",
      "examples": [
        {
          "input": "numbers = [ 2 , 7 ,11,15], target = 9",
          "output": "[1,2]",
          "explanation": "The sum of 2 and 7 is 9. Therefore, index 1 = 1, index 2 = 2. We return [1, 2]."
        },
        {
          "input": "numbers = [ 2 ,3, 4 ], target = 6",
          "output": "[1,3]",
          "explanation": "The sum of 2 and 4 is 6. Therefore index 1 = 1, index 2 = 3. We return [1, 3]."
        }
      ],
      "constraints": [
        "2 <= numbers.length <= 3 * 10^4",
        "-1000 <= numbers[i] <= 1000",
        "numbers is sorted in non-decreasing order .",
        "-1000 <= target <= 1000"
      ]
    }
  ],
  "sliding-window": [
    {
      "slug": "longest-substring-without-repeating-characters",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "medium",
      "description": "Given a string s , find the length of the longest substring without duplicate characters.",
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "The answer is \"abc\", with the length of 3. Note that \"bca\" and \"cab\" are also correct answers."
        },
        {
          "input": "s = \"bbbbb\"",
          "output": "1",
          "explanation": "The answer is \"b\", with the length of 1."
        }
      ],
      "constraints": [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ]
    },
    {
      "slug": "minimum-window-substring",
      "title": "Minimum Window Substring",
      "difficulty": "hard",
      "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t ( including duplicates ) is included in the window . If there is no such substring, return the empty string \"\" . The testcases will be generated such that the answer is unique .",
      "examples": [
        {
          "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
          "output": "\"BANC\"",
          "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
        },
        {
          "input": "s = \"a\", t = \"a\"",
          "output": "\"a\"",
          "explanation": "The entire string s is the minimum window."
        }
      ],
      "constraints": [
        "m == s.length",
        "n == t.length",
        "1 <= m, n <= 10^5",
        "s and t consist of uppercase and lowercase English letters."
      ]
    },
    {
      "slug": "best-time-to-buy-and-sell-stock",
      "title": "Best Time to Buy And Sell Stock",
      "difficulty": "easy",
      "description": "You are given an array prices where prices[i] is the price of a given stock on the i^th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction .",
      "examples": [
        {
          "input": "prices = [7,1,5,3,6,4]",
          "output": "5",
          "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
        },
        {
          "input": "prices = [7,6,4,3,1]",
          "output": "0",
          "explanation": "In this case, no transactions are done and the max profit = 0."
        }
      ],
      "constraints": [
        "1 <= prices.length <= 10^5",
        "0 <= prices[i] <= 10^4"
      ]
    },
    {
      "slug": "sliding-window-maximum",
      "title": "Sliding Window Maximum",
      "difficulty": "hard",
      "description": "You are given an array of integers nums , there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.",
      "examples": [
        {
          "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          "output": "[3,3,5,5,6,7]",
          "explanation": "Window position Max --------------- ----- [1 3 -1] -3 5 3 6 7 3 1 [3 -1 -3] 5 3 6 7 3 1 3 [-1 -3 5] 3 6 7 5 1 3 -1 [-3 5 3] 6 7 5 1 3 -1 -3 [5 3 6] 7 6 1 3 -1 -3 5 [3 6 7] 7"
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
        "1 <= k <= nums.length"
      ]
    },
    {
      "slug": "longest-repeating-character-replacement",
      "title": "Longest Repeating Character Replacement",
      "difficulty": "medium",
      "description": "You are given a string s and an integer k . You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.",
      "examples": [
        {
          "input": "s = \"ABAB\", k = 2",
          "output": "4",
          "explanation": "Replace the two 'A's with two 'B's or vice versa."
        },
        {
          "input": "s = \"AABABBA\", k = 1",
          "output": "4",
          "explanation": "Replace the one 'A' in the middle with 'B' and form \"AABBBBA\". The substring \"BBBB\" has the longest repeating letters, which is 4. There may exists other ways to achieve this answer too."
        }
      ],
      "constraints": [
        "1 <= s.length <= 10^5",
        "s consists of only uppercase English letters.",
        "0 <= k <= s.length"
      ]
    },
    {
      "slug": "permutation-in-string",
      "title": "Permutation In String",
      "difficulty": "medium",
      "description": "Given two strings s1 and s2 , return true if s2 contains a permutation of s1 , or false otherwise. In other words, return true if one of s1 's permutations is the substring of s2 .",
      "examples": [
        {
          "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
          "output": "true",
          "explanation": "s2 contains one permutation of s1 (\"ba\")."
        },
        {
          "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
          "output": "false"
        }
      ],
      "constraints": [
        "1 <= s1.length, s2.length <= 10^4",
        "s1 and s2 consist of lowercase English letters."
      ]
    }
  ],
  "stack": [
    {
      "slug": "valid-parentheses",
      "title": "Valid Parentheses",
      "difficulty": "easy",
      "description": "Given a string s containing just the characters '(' , ')' , '{' , '}' , '[' and ']' , determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "true"
        },
        {
          "input": "s = \"()[]{}\"",
          "output": "true"
        }
      ],
      "constraints": [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}' ."
      ]
    },
    {
      "slug": "generate-parentheses",
      "title": "Generate Parentheses",
      "difficulty": "medium",
      "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses .",
      "examples": [
        {
          "input": "n = 3",
          "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
        },
        {
          "input": "n = 1",
          "output": "[\"()\"]"
        }
      ],
      "constraints": [
        "1 <= n <= 8"
      ]
    },
    {
      "slug": "largest-rectangle-in-histogram",
      "title": "Largest Rectangle In Histogram",
      "difficulty": "hard",
      "description": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1 , return the area of the largest rectangle in the histogram .",
      "examples": [
        {
          "input": "heights = [2,1,5,6,2,3]",
          "output": "10",
          "explanation": "The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units."
        },
        {
          "input": "heights = [2,4]",
          "output": "4"
        }
      ],
      "constraints": [
        "1 <= heights.length <= 10^5",
        "0 <= heights[i] <= 10^4"
      ]
    },
    {
      "slug": "evaluate-reverse-polish-notation",
      "title": "Evaluate Reverse Polish Notation",
      "difficulty": "medium",
      "description": "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation . Evaluate the expression. Return an integer that represents the value of the expression .",
      "examples": [
        {
          "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
          "output": "9",
          "explanation": "((2 + 1) * 3) = 9"
        },
        {
          "input": "tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]",
          "output": "6",
          "explanation": "(4 + (13 / 5)) = 6"
        }
      ],
      "constraints": [
        "1 <= tokens.length <= 10^4",
        "tokens[i] is either an operator: \"+\" , \"-\" , \"*\" , or \"/\" , or an integer in the range [-200, 200] ."
      ]
    },
    {
      "slug": "min-stack",
      "title": "Min Stack",
      "difficulty": "medium",
      "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class: MinStack() initializes the stack object. void push(int val) pushes the element val onto the stack.",
      "examples": [
        {
          "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"] [[],[-2],[0],[-3],[],[],[],[]]",
          "output": "[null,null,null,null,-3,null,0,-2]",
          "explanation": "MinStack minStack = new MinStack(); minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin(); // return -3 minStack.pop(); minStack.top(); // return 0 minStack.getMin(); // return -2"
        }
      ],
      "constraints": [
        "-2^31 <= val <= 2^31 - 1",
        "Methods pop , top and getMin operations will always be called on non-empty stacks.",
        "At most 3 * 10^4 calls will be made to push , pop , top , and getMin ."
      ]
    },
    {
      "slug": "daily-temperatures",
      "title": "Daily Temperatures",
      "difficulty": "medium",
      "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i^th day to get a warmer temperature . If there is no future day for which this is possible, keep answer[i] == 0 instead.",
      "examples": [
        {
          "input": "temperatures = [73,74,75,71,69,72,76,73]",
          "output": "[1,1,4,2,1,1,0,0]"
        },
        {
          "input": "temperatures = [30,40,50,60]",
          "output": "[1,1,1,0]"
        }
      ],
      "constraints": [
        "1 <= temperatures.length <= 10^5",
        "30 <= temperatures[i] <= 100"
      ]
    },
    {
      "slug": "car-fleet",
      "title": "Car Fleet",
      "difficulty": "medium",
      "description": "There are n cars at given miles away from the starting mile 0, traveling to reach the mile target . You are given two integer arrays position and speed , both of length n , where position[i] is the starting mile of the i^th car and speed[i] is the speed of the i^th car in miles per hour. A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.",
      "examples": [
        {
          "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
          "output": "3",
          "explanation": "The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target . The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself. The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target ."
        },
        {
          "input": "target = 10, position = [3], speed = [3]",
          "output": "1",
          "explanation": "There is only one car, hence there is only one fleet."
        }
      ],
      "constraints": [
        "n == position.length == speed.length",
        "1 <= n <= 10^5",
        "0 < target <= 10^6",
        "0 <= position[i] < target"
      ]
    }
  ],
  "binary-search": [
    {
      "slug": "median-of-two-sorted-arrays",
      "title": "Median of Two Sorted Arrays",
      "difficulty": "hard",
      "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)) .",
      "examples": [
        {
          "input": "nums1 = [1,3], nums2 = [2]",
          "output": "2.00000",
          "explanation": "merged array = [1,2,3] and median is 2."
        },
        {
          "input": "nums1 = [1,2], nums2 = [3,4]",
          "output": "2.50000",
          "explanation": "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
        }
      ],
      "constraints": [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000"
      ]
    },
    {
      "slug": "search-in-rotated-sorted-array",
      "title": "Search In Rotated Sorted Array",
      "difficulty": "medium",
      "description": "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly left rotated at an unknown index k ( 1 <= k < nums.length ) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] ( 0-indexed ). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2] .",
      "examples": [
        {
          "input": "nums = [4,5,6,7,0,1,2], target = 0",
          "output": "4"
        },
        {
          "input": "nums = [4,5,6,7,0,1,2], target = 3",
          "output": "-1"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 5000",
        "-10^4 <= nums[i] <= 10^4",
        "All values of nums are unique .",
        "nums is an ascending array that is possibly rotated."
      ]
    },
    {
      "slug": "search-a-2d-matrix",
      "title": "Search a 2D Matrix",
      "difficulty": "medium",
      "description": "You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target , return true if target is in matrix or false otherwise .",
      "examples": [
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
          "output": "true"
        },
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
          "output": "false"
        }
      ],
      "constraints": [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 <= m, n <= 100",
        "-10^4 <= matrix[i][j], target <= 10^4"
      ]
    },
    {
      "slug": "find-minimum-in-rotated-sorted-array",
      "title": "Find Minimum In Rotated Sorted Array",
      "difficulty": "medium",
      "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become: [4,5,6,7,0,1,2] if it was rotated 4 times. [0,1,2,4,5,6,7] if it was rotated 7 times.",
      "examples": [
        {
          "input": "nums = [3,4,5,1,2]",
          "output": "1",
          "explanation": "The original array was [1,2,3,4,5] rotated 3 times."
        },
        {
          "input": "nums = [4,5,6,7,0,1,2]",
          "output": "0",
          "explanation": "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times."
        }
      ],
      "constraints": [
        "n == nums.length",
        "1 <= n <= 5000",
        "-5000 <= nums[i] <= 5000",
        "All the integers of nums are unique ."
      ]
    },
    {
      "slug": "binary-search",
      "title": "Binary Search",
      "difficulty": "easy",
      "description": "Given an array of integers nums which is sorted in ascending order, and an integer target , write a function to search target in nums . If target exists, then return its index. Otherwise, return -1 .",
      "examples": [
        {
          "input": "nums = [-1,0,3,5,9,12], target = 9",
          "output": "4",
          "explanation": "9 exists in nums and its index is 4"
        },
        {
          "input": "nums = [-1,0,3,5,9,12], target = 2",
          "output": "-1",
          "explanation": "2 does not exist in nums so return -1"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^4",
        "-10^4 < nums[i], target < 10^4",
        "All the integers in nums are unique .",
        "nums is sorted in ascending order."
      ]
    },
    {
      "slug": "koko-eating-bananas",
      "title": "Koko Eating Bananas",
      "difficulty": "medium",
      "description": "Koko loves to eat bananas. There are n piles of bananas, the i^th pile has piles[i] bananas. The guards have gone and will come back in h hours.",
      "examples": [
        {
          "input": "piles = [3,6,7,11], h = 8",
          "output": "4"
        },
        {
          "input": "piles = [30,11,23,4,20], h = 5",
          "output": "30"
        }
      ],
      "constraints": [
        "1 <= piles.length <= 10^4",
        "piles.length <= h <= 10^9",
        "1 <= piles[i] <= 10^9"
      ]
    },
    {
      "slug": "time-based-key-value-store",
      "title": "Time Based Key Value Store",
      "difficulty": "medium",
      "description": "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp. Implement the TimeMap class: TimeMap() Initializes the object of the data structure. void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp .",
      "examples": [
        {
          "input": "[\"TimeMap\", \"set\", \"get\", \"get\", \"set\", \"get\", \"get\"] [[], [\"foo\", \"bar\", 1], [\"foo\", 1], [\"foo\", 3], [\"foo\", \"bar2\", 4], [\"foo\", 4], [\"foo\", 5]]",
          "output": "[null, null, \"bar\", \"bar\", null, \"bar2\", \"bar2\"]",
          "explanation": "TimeMap timeMap = new TimeMap(); timeMap.set(\"foo\", \"bar\", 1); // store the key \"foo\" and value \"bar\" along with timestamp = 1. timeMap.get(\"foo\", 1); // return \"bar\" timeMap.get(\"foo\", 3); // return \"bar\", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is \"bar\". timeMap.set(\"foo\", \"bar2\", 4); // store the key \"foo\" and value \"bar2\" along with timestamp = 4. timeMap.get(\"foo\", 4); // return \"bar2\" timeMap.get(\"foo\", 5); // return \"bar2\""
        }
      ],
      "constraints": [
        "1 <= key.length, value.length <= 100",
        "key and value consist of lowercase English letters and digits.",
        "1 <= timestamp <= 10^7",
        "All the timestamps timestamp of set are strictly increasing."
      ]
    }
  ],
  "linked-list": [
    {
      "slug": "add-two-numbers",
      "title": "Add Two Numbers",
      "difficulty": "medium",
      "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order , and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
      "examples": [
        {
          "input": "l1 = [2,4,3], l2 = [5,6,4]",
          "output": "[7,0,8]",
          "explanation": "342 + 465 = 807."
        },
        {
          "input": "l1 = [0], l2 = [0]",
          "output": "[0]"
        }
      ],
      "constraints": [
        "The number of nodes in each linked list is in the range [1, 100] .",
        "0 <= Node.val <= 9",
        "It is guaranteed that the list represents a number that does not have leading zeros."
      ]
    },
    {
      "slug": "remove-nth-node-from-end-of-list",
      "title": "Remove Nth Node From End of List",
      "difficulty": "medium",
      "description": "Given the head of a linked list, remove the n^th node from the end of the list and return its head.",
      "examples": [
        {
          "input": "head = [1,2,3,4,5], n = 2",
          "output": "[1,2,3,5]"
        },
        {
          "input": "head = [1], n = 1",
          "output": "[]"
        }
      ],
      "constraints": [
        "The number of nodes in the list is sz .",
        "1 <= sz <= 30",
        "0 <= Node.val <= 100",
        "1 <= n <= sz"
      ]
    },
    {
      "slug": "merge-two-sorted-lists",
      "title": "Merge Two Sorted Lists",
      "difficulty": "easy",
      "description": "You are given the heads of two sorted linked lists list1 and list2 . Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      "examples": [
        {
          "input": "list1 = [1,2,4], list2 = [1,3,4]",
          "output": "[1,1,2,3,4,4]"
        },
        {
          "input": "list1 = [], list2 = []",
          "output": "[]"
        }
      ],
      "constraints": [
        "The number of nodes in both lists is in the range [0, 50] .",
        "-100 <= Node.val <= 100",
        "Both list1 and list2 are sorted in non-decreasing order."
      ]
    },
    {
      "slug": "merge-k-sorted-lists",
      "title": "Merge K Sorted Lists",
      "difficulty": "hard",
      "description": "You are given an array of k linked-lists lists , each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      "examples": [
        {
          "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
          "output": "[1,1,2,3,4,4,5,6]",
          "explanation": "The linked-lists are: [ 1->4->5, 1->3->4, 2->6 ] merging them into one sorted linked list: 1->1->2->3->4->4->5->6"
        },
        {
          "input": "lists = []",
          "output": "[]"
        }
      ],
      "constraints": [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4"
      ]
    },
    {
      "slug": "reverse-nodes-in-k-group",
      "title": "Reverse Nodes In K Group",
      "difficulty": "hard",
      "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list . k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.",
      "examples": [
        {
          "input": "head = [1,2,3,4,5], k = 2",
          "output": "[2,1,4,3,5]"
        },
        {
          "input": "head = [1,2,3,4,5], k = 3",
          "output": "[3,2,1,4,5]"
        }
      ],
      "constraints": [
        "The number of nodes in the list is n .",
        "1 <= k <= n <= 5000",
        "0 <= Node.val <= 1000"
      ]
    },
    {
      "slug": "copy-list-with-random-pointer",
      "title": "Copy List With Random Pointer",
      "difficulty": "medium",
      "description": "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null . Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node.",
      "examples": [
        {
          "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
          "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
        },
        {
          "input": "head = [[1,1],[2,1]]",
          "output": "[[1,1],[2,1]]"
        }
      ],
      "constraints": [
        "0 <= n <= 1000",
        "-10^4 <= Node.val <= 10^4",
        "Node.random is null or is pointing to some node in the linked list."
      ]
    },
    {
      "slug": "linked-list-cycle",
      "title": "Linked List Cycle",
      "difficulty": "easy",
      "description": "Given head , the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to.",
      "examples": [
        {
          "input": "head = [3,2,0,-4], pos = 1",
          "output": "true",
          "explanation": "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)."
        },
        {
          "input": "head = [1,2], pos = 0",
          "output": "true",
          "explanation": "There is a cycle in the linked list, where the tail connects to the 0th node."
        }
      ],
      "constraints": [
        "The number of the nodes in the list is in the range [0, 10^4] .",
        "-10^5 <= Node.val <= 10^5",
        "pos is -1 or a valid index in the linked-list."
      ]
    },
    {
      "slug": "reorder-list",
      "title": "Reorder List",
      "difficulty": "medium",
      "description": "You are given the head of a singly linked-list. The list can be represented as: L 0 → L 1 → … → L n - 1 → L n Reorder the list to be on the following form: L 0 → L n → L 1 → L n - 1 → L 2 → L n - 2 → … You may not modify the values in the list's nodes. Only nodes themselves may be changed.",
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[1,4,2,3]"
        },
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[1,5,2,4,3]"
        }
      ],
      "constraints": [
        "The number of nodes in the list is in the range [1, 5 * 10^4] .",
        "1 <= Node.val <= 1000"
      ]
    },
    {
      "slug": "lru-cache",
      "title": "LRU Cache",
      "difficulty": "medium",
      "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache . Implement the LRUCache class: LRUCache(int capacity) Initialize the LRU cache with positive size capacity . int get(int key) Return the value of the key if the key exists, otherwise return -1 .",
      "examples": [
        {
          "input": "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]",
          "output": "[null, null, null, 1, null, -1, null, -1, 3, 4]",
          "explanation": "LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); // cache is {1=1} lRUCache.put(2, 2); // cache is {1=1, 2=2} lRUCache.get(1); // return 1 lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3} lRUCache.get(2); // returns -1 (not found) lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3} lRUCache.get(1); // return -1 (not found) lRUCache.get(3); // return 3 lRUCache.get(4); // return 4"
        }
      ],
      "constraints": [
        "1 <= capacity <= 3000",
        "0 <= key <= 10^4",
        "0 <= value <= 10^5",
        "At most 2 * 10^5 calls will be made to get and put ."
      ]
    },
    {
      "slug": "reverse-linked-list",
      "title": "Reverse Linked List",
      "difficulty": "easy",
      "description": "Given the head of a singly linked list, reverse the list, and return the reversed list .",
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[5,4,3,2,1]"
        },
        {
          "input": "head = [1,2]",
          "output": "[2,1]"
        }
      ],
      "constraints": [
        "The number of nodes in the list is the range [0, 5000] .",
        "-5000 <= Node.val <= 5000"
      ]
    },
    {
      "slug": "find-the-duplicate-number",
      "title": "Find The Duplicate Number",
      "difficulty": "medium",
      "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums , return this repeated number . You must solve the problem without modifying the array nums and using only constant extra space.",
      "examples": [
        {
          "input": "nums = [1,3,4,2,2]",
          "output": "2"
        },
        {
          "input": "nums = [3,1,3,4,2]",
          "output": "3"
        }
      ],
      "constraints": [
        "1 <= n <= 10^5",
        "nums.length == n + 1",
        "1 <= nums[i] <= n",
        "All the integers in nums appear only once except for precisely one integer which appears two or more times."
      ]
    }
  ],
  "trees": [
    {
      "slug": "validate-binary-search-tree",
      "title": "Validate Binary Search Tree",
      "difficulty": "medium",
      "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST) . A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key. The right subtree of a node contains only nodes with keys strictly greater than the node's key.",
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "true"
        },
        {
          "input": "root = [5,1,4,null,null,3,6]",
          "output": "false",
          "explanation": "The root node's value is 5 but its right child's value is 4."
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [1, 10^4] .",
        "-2^31 <= Node.val <= 2^31 - 1"
      ]
    },
    {
      "slug": "same-tree",
      "title": "Same Tree",
      "difficulty": "easy",
      "description": "Given the roots of two binary trees p and q , write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
      "examples": [
        {
          "input": "p = [1,2,3], q = [1,2,3]",
          "output": "true"
        },
        {
          "input": "p = [1,2], q = [1,null,2]",
          "output": "false"
        }
      ],
      "constraints": [
        "The number of nodes in both trees is in the range [0, 100] .",
        "-10^4 <= Node.val <= 10^4"
      ]
    },
    {
      "slug": "binary-tree-level-order-traversal",
      "title": "Binary Tree Level Order Traversal",
      "difficulty": "medium",
      "description": "Given the root of a binary tree, return the level order traversal of its nodes' values . (i.e., from left to right, level by level).",
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "[[3],[9,20],[15,7]]"
        },
        {
          "input": "root = [1]",
          "output": "[[1]]"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 2000] .",
        "-1000 <= Node.val <= 1000"
      ]
    },
    {
      "slug": "maximum-depth-of-binary-tree",
      "title": "Maximum Depth of Binary Tree",
      "difficulty": "easy",
      "description": "Given the root of a binary tree, return its maximum depth . A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "3"
        },
        {
          "input": "root = [1,null,2]",
          "output": "2"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 10^4] .",
        "-100 <= Node.val <= 100"
      ]
    },
    {
      "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
      "title": "Construct Binary Tree From Preorder And Inorder Traversal",
      "difficulty": "medium",
      "description": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree .",
      "examples": [
        {
          "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
          "output": "[3,9,20,null,null,15,7]"
        },
        {
          "input": "preorder = [-1], inorder = [-1]",
          "output": "[-1]"
        }
      ],
      "constraints": [
        "1 <= preorder.length <= 3000",
        "inorder.length == preorder.length",
        "-3000 <= preorder[i], inorder[i] <= 3000",
        "preorder and inorder consist of unique values."
      ]
    },
    {
      "slug": "balanced-binary-tree",
      "title": "Balanced Binary Tree",
      "difficulty": "easy",
      "description": "Given a binary tree, determine if it is height-balanced .",
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "true"
        },
        {
          "input": "root = [1,2,2,3,3,null,null,4,4]",
          "output": "false"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 5000] .",
        "-10^4 <= Node.val <= 10^4"
      ]
    },
    {
      "slug": "binary-tree-maximum-path-sum",
      "title": "Binary Tree Maximum Path Sum",
      "difficulty": "hard",
      "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once . Note that the path does not need to pass through the root.",
      "examples": [
        {
          "input": "root = [1,2,3]",
          "output": "6",
          "explanation": "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
        },
        {
          "input": "root = [-10,9,20,null,null,15,7]",
          "output": "42",
          "explanation": "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42."
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [1, 3 * 10^4] .",
        "-1000 <= Node.val <= 1000"
      ]
    },
    {
      "slug": "binary-tree-right-side-view",
      "title": "Binary Tree Right Side View",
      "difficulty": "medium",
      "description": "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom .",
      "examples": [
        {
          "input": "root = [1,2,3,null,5,null,4]",
          "output": "[1,3,4]"
        },
        {
          "input": "root = [1,2,3,4,null,null,null,5]",
          "output": "[1,3,4,5]"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 100] .",
        "-100 <= Node.val <= 100"
      ]
    },
    {
      "slug": "invert-binary-tree",
      "title": "Invert Binary Tree",
      "difficulty": "easy",
      "description": "Given the root of a binary tree, invert the tree, and return its root .",
      "examples": [
        {
          "input": "root = [4,2,7,1,3,6,9]",
          "output": "[4,7,2,9,6,3,1]"
        },
        {
          "input": "root = [2,1,3]",
          "output": "[2,3,1]"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 100] .",
        "-100 <= Node.val <= 100"
      ]
    },
    {
      "slug": "kth-smallest-element-in-a-bst",
      "title": "Kth Smallest Element In a Bst",
      "difficulty": "medium",
      "description": "Given the root of a binary search tree, and an integer k , return the k^th smallest value ( 1-indexed ) of all the values of the nodes in the tree .",
      "examples": [
        {
          "input": "root = [3,1,4,null,2], k = 1",
          "output": "1"
        },
        {
          "input": "root = [5,3,6,2,4,null,null,1], k = 3",
          "output": "3"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is n .",
        "1 <= k <= n <= 10^4",
        "0 <= Node.val <= 10^4"
      ]
    },
    {
      "slug": "lowest-common-ancestor-of-a-binary-search-tree",
      "title": "Lowest Common Ancestor of a Binary Search Tree",
      "difficulty": "medium",
      "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia : “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself ).”",
      "examples": [
        {
          "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
          "output": "6",
          "explanation": "The LCA of nodes 2 and 8 is 6."
        },
        {
          "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
          "output": "2",
          "explanation": "The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition."
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [2, 10^5] .",
        "-10^9 <= Node.val <= 10^9",
        "All Node.val are unique .",
        "p != q"
      ]
    },
    {
      "slug": "serialize-and-deserialize-binary-tree",
      "title": "Serialize And Deserialize Binary Tree",
      "difficulty": "hard",
      "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.",
      "examples": [
        {
          "input": "root = [1,2,3,null,null,4,5]",
          "output": "[1,2,3,null,null,4,5]"
        },
        {
          "input": "root = []",
          "output": "[]"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 10^4] .",
        "-1000 <= Node.val <= 1000"
      ]
    },
    {
      "slug": "diameter-of-binary-tree",
      "title": "Diameter of Binary Tree",
      "difficulty": "easy",
      "description": "Given the root of a binary tree, return the length of the diameter of the tree . The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root .",
      "examples": [
        {
          "input": "root = [1,2,3,4,5]",
          "output": "3",
          "explanation": "3 is the length of the path [4,2,1,3] or [5,2,1,3]."
        },
        {
          "input": "root = [1,2]",
          "output": "1"
        }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [1, 10^4] .",
        "-100 <= Node.val <= 100"
      ]
    },
    {
      "slug": "subtree-of-another-tree",
      "title": "Subtree of Another Tree",
      "difficulty": "easy",
      "description": "Given the roots of two binary trees root and subRoot , return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise. A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.",
      "examples": [
        {
          "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
          "output": "true"
        },
        {
          "input": "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
          "output": "false"
        }
      ],
      "constraints": [
        "The number of nodes in the root tree is in the range [1, 2000] .",
        "The number of nodes in the subRoot tree is in the range [1, 1000] .",
        "-10^4 <= root.val <= 10^4",
        "-10^4 <= subRoot.val <= 10^4"
      ]
    },
    {
      "slug": "count-good-nodes-in-binary-tree",
      "title": "Count Good Nodes In Binary Tree",
      "difficulty": "medium",
      "description": "Given a binary tree root , a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.",
      "examples": [
        {
          "input": "root = [3,1,4,3,null,1,5]",
          "output": "4",
          "explanation": "Nodes in blue are good . Root Node (3) is always a good node. Node 4 -> (3,4) is the maximum value in the path starting from the root. Node 5 -> (3,4,5) is the maximum value in the path Node 3 -> (3,1,3) is the maximum value in the path."
        },
        {
          "input": "root = [3,3,null,4,2]",
          "output": "3",
          "explanation": "Node 2 -> (3, 3, 2) is not good, because \"3\" is higher than it."
        }
      ],
      "constraints": [
        "The number of nodes in the binary tree is in the range [1, 10^5] .",
        "Each node's value is between [-10^4, 10^4] ."
      ]
    }
  ],
  "heap-priority-queue": [
    {
      "slug": "kth-largest-element-in-an-array",
      "title": "Kth Largest Element In An Array",
      "difficulty": "medium",
      "description": "Given an integer array nums and an integer k , return the k^th largest element in the array . Note that it is the k^th largest element in the sorted order, not the k^th distinct element. Can you solve it without sorting?",
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5"
        },
        {
          "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
          "output": "4"
        }
      ],
      "constraints": [
        "1 <= k <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4"
      ]
    },
    {
      "slug": "find-median-from-data-stream",
      "title": "Find Median From Data Stream",
      "difficulty": "hard",
      "description": "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. For example, for arr = [2,3,4] , the median is 3 .",
      "examples": [
        {
          "input": "[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"] [[], [1], [2], [], [3], []]",
          "output": "[null, null, null, 1.5, null, 2.0]",
          "explanation": "MedianFinder medianFinder = new MedianFinder(); medianFinder.addNum(1); // arr = [1] medianFinder.addNum(2); // arr = [1, 2] medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2) medianFinder.addNum(3); // arr[1, 2, 3] medianFinder.findMedian(); // return 2.0"
        }
      ],
      "constraints": [
        "-10^5 <= num <= 10^5",
        "There will be at least one element in the data structure before calling findMedian .",
        "At most 5 * 10^4 calls will be made to addNum and findMedian .",
        "If all integer numbers from the stream are in the range [0, 100] , how would you optimize your solution?"
      ]
    },
    {
      "slug": "design-twitter",
      "title": "Design Twitter",
      "difficulty": "medium",
      "description": "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed. Implement the Twitter class: Twitter() Initializes your twitter object. void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId .",
      "examples": [
        {
          "input": "[\"Twitter\", \"postTweet\", \"getNewsFeed\", \"follow\", \"postTweet\", \"getNewsFeed\", \"unfollow\", \"getNewsFeed\"] [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]",
          "output": "[null, null, [5], null, null, [6, 5], null, [5]]",
          "explanation": "Twitter twitter = new Twitter(); twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5). twitter.getNewsFeed(1); // User 1's news feed should return a list with 1 tweet id -> [5]. return [5] twitter.follow(1, 2); // User 1 follows user 2. twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6). twitter.getNewsFeed(1); // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5. twitter.unfollow(1, 2); // User 1 unfollows user 2. twitter.getNewsFeed(1); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2."
        }
      ],
      "constraints": [
        "1 <= userId, followerId, followeeId <= 500",
        "0 <= tweetId <= 10^4",
        "All the tweets have unique IDs.",
        "At most 3 * 10^4 calls will be made to postTweet , getNewsFeed , follow , and unfollow ."
      ]
    },
    {
      "slug": "task-scheduler",
      "title": "Task Scheduler",
      "difficulty": "medium",
      "description": "You are given an array of CPU tasks , each labeled with a letter from A to Z, and a number n . Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.",
      "examples": [
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
          "output": "8",
          "explanation": "A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B. After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3^rd interval, neither A nor B can be done, so you idle. By the 4^th interval, you can do A again as 2 intervals have passed."
        },
        {
          "input": "tasks = [\"A\",\"C\",\"A\",\"B\",\"D\",\"B\"], n = 1",
          "output": "6",
          "explanation": "A possible sequence is: A -> B -> C -> D -> A -> B. With a cooling interval of 1, you can repeat a task after just one other task."
        }
      ],
      "constraints": [
        "1 <= tasks.length <= 10^4",
        "tasks[i] is an uppercase English letter.",
        "0 <= n <= 100"
      ]
    },
    {
      "slug": "kth-largest-element-in-a-stream",
      "title": "Kth Largest Element In a Stream",
      "difficulty": "easy",
      "description": "You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores. You are tasked to implement a class which, for a given integer k , maintains a stream of test scores and continuously returns the k th highest test score after a new score has been submitted.",
      "examples": [
        {
          "input": "[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"] [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]",
          "output": "[null, 4, 5, 5, 8, 8]",
          "explanation": "KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]); kthLargest.add(3); // return 4 kthLargest.add(5); // return 5 kthLargest.add(10); // return 5 kthLargest.add(9); // return 8 kthLargest.add(4); // return 8"
        },
        {
          "input": "[\"KthLargest\", \"add\", \"add\", \"add\", \"add\"] [[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]",
          "output": "[null, 7, 7, 7, 8]",
          "explanation": "KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]); kthLargest.add(2); // return 7 kthLargest.add(10); // return 7 kthLargest.add(9); // return 7 kthLargest.add(9); // return 8"
        }
      ],
      "constraints": [
        "0 <= nums.length <= 10^4",
        "1 <= k <= nums.length + 1",
        "-10^4 <= nums[i] <= 10^4",
        "-10^4 <= val <= 10^4"
      ]
    },
    {
      "slug": "k-closest-points-to-origin",
      "title": "K Closest Points to Origin",
      "difficulty": "medium",
      "description": "Given an array of points where points[i] = [x i , y i ] represents a point on the X-Y plane and an integer k , return the k closest points to the origin (0, 0) . The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x 1 - x 2 )^2 + (y 1 - y 2 )^2 ). You may return the answer in any order .",
      "examples": [
        {
          "input": "points = [[1,3],[-2,2]], k = 1",
          "output": "[[-2,2]]",
          "explanation": "The distance between (1, 3) and the origin is sqrt(10). The distance between (-2, 2) and the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin. We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]]."
        },
        {
          "input": "points = [[3,3],[5,-1],[-2,4]], k = 2",
          "output": "[[3,3],[-2,4]]",
          "explanation": "The answer [[-2,4],[3,3]] would also be accepted."
        }
      ],
      "constraints": [
        "1 <= k <= points.length <= 10^4",
        "-10^4 <= x i , y i <= 10^4"
      ]
    },
    {
      "slug": "last-stone-weight",
      "title": "Last Stone Weight",
      "difficulty": "easy",
      "description": "You are given an array of integers stones where stones[i] is the weight of the i^th stone. We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.",
      "examples": [
        {
          "input": "stones = [2,7,4,1,8,1]",
          "output": "1",
          "explanation": "We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then, we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then, we combine 2 and 1 to get 1 so the array converts to [1,1,1] then, we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone."
        },
        {
          "input": "stones = [1]",
          "output": "1"
        }
      ],
      "constraints": [
        "1 <= stones.length <= 30",
        "1 <= stones[i] <= 1000"
      ]
    }
  ],
  "backtracking": [
    {
      "slug": "letter-combinations-of-a-phone-number",
      "title": "Letter Combinations of a Phone Number",
      "difficulty": "medium",
      "description": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order . A mapping of digits to letters (just like on the telephone buttons) is given below.",
      "examples": [
        {
          "input": "digits = \"23\"",
          "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
        },
        {
          "input": "digits = \"2\"",
          "output": "[\"a\",\"b\",\"c\"]"
        }
      ],
      "constraints": [
        "1 <= digits.length <= 4",
        "digits[i] is a digit in the range ['2', '9'] ."
      ]
    },
    {
      "slug": "combination-sum",
      "title": "Combination Sum",
      "difficulty": "medium",
      "description": "Given an array of distinct integers candidates and a target integer target , return a list of all unique combinations of candidates where the chosen numbers sum to target . You may return the combinations in any order . The same number may be chosen from candidates an unlimited number of times .",
      "examples": [
        {
          "input": "candidates = [2,3,6,7], target = 7",
          "output": "[[2,2,3],[7]]",
          "explanation": "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations."
        },
        {
          "input": "candidates = [2,3,5], target = 8",
          "output": "[[2,2,2,2],[2,3,3],[3,5]]"
        }
      ],
      "constraints": [
        "1 <= candidates.length <= 30",
        "2 <= candidates[i] <= 40",
        "All elements of candidates are distinct .",
        "1 <= target <= 40"
      ]
    },
    {
      "slug": "combination-sum-ii",
      "title": "Combination Sum II",
      "difficulty": "medium",
      "description": "Given a collection of candidate numbers ( candidates ) and a target number ( target ), find all unique combinations in candidates where the candidate numbers sum to target . Each number in candidates may only be used once in the combination. Note: The solution set must not contain duplicate combinations.",
      "examples": [
        {
          "input": "candidates = [10,1,2,7,6,1,5], target = 8",
          "output": "[ [1,1,6], [1,2,5], [1,7], [2,6] ]"
        },
        {
          "input": "candidates = [2,5,2,1,2], target = 5",
          "output": "[ [1,2,2], [5] ]"
        }
      ],
      "constraints": [
        "1 <= candidates.length <= 100",
        "1 <= candidates[i] <= 50",
        "1 <= target <= 30"
      ]
    },
    {
      "slug": "permutations",
      "title": "Permutations",
      "difficulty": "medium",
      "description": "Given an array nums of distinct integers, return all the possible permutations . You can return the answer in any order .",
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
        },
        {
          "input": "nums = [0,1]",
          "output": "[[0,1],[1,0]]"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 6",
        "-10 <= nums[i] <= 10",
        "All the integers of nums are unique ."
      ]
    },
    {
      "slug": "n-queens",
      "title": "N Queens",
      "difficulty": "hard",
      "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n , return all distinct solutions to the n-queens puzzle . You may return the answer in any order .",
      "examples": [
        {
          "input": "n = 4",
          "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
          "explanation": "There exist two distinct solutions to the 4-queens puzzle as shown above"
        },
        {
          "input": "n = 1",
          "output": "[[\"Q\"]]"
        }
      ],
      "constraints": [
        "1 <= n <= 9"
      ]
    },
    {
      "slug": "subsets",
      "title": "Subsets",
      "difficulty": "medium",
      "description": "Given an integer array nums of unique elements, return all possible subsets (the power set) . The solution set must not contain duplicate subsets. Return the solution in any order .",
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10",
        "-10 <= nums[i] <= 10",
        "All the numbers of nums are unique ."
      ]
    },
    {
      "slug": "word-search",
      "title": "Word Search",
      "difficulty": "medium",
      "description": "Given an m x n grid of characters board and a string word , return true if word exists in the grid . The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
      "examples": [
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
          "output": "true"
        },
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"",
          "output": "true"
        }
      ],
      "constraints": [
        "m == board.length",
        "n = board[i].length",
        "1 <= m, n <= 6",
        "1 <= word.length <= 15"
      ]
    },
    {
      "slug": "subsets-ii",
      "title": "Subsets II",
      "difficulty": "medium",
      "description": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set) . The solution set must not contain duplicate subsets. Return the solution in any order .",
      "examples": [
        {
          "input": "nums = [1,2,2]",
          "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]"
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10",
        "-10 <= nums[i] <= 10"
      ]
    },
    {
      "slug": "palindrome-partitioning",
      "title": "Palindrome Partitioning",
      "difficulty": "medium",
      "description": "Given a string s , partition s such that every substring of the partition is a palindrome . Return all possible palindrome partitioning of s .",
      "examples": [
        {
          "input": "s = \"aab\"",
          "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
        },
        {
          "input": "s = \"a\"",
          "output": "[[\"a\"]]"
        }
      ],
      "constraints": [
        "1 <= s.length <= 16",
        "s contains only lowercase English letters."
      ]
    }
  ],
  "tries": [
    {
      "slug": "implement-trie-prefix-tree",
      "title": "Implement Trie Prefix Tree",
      "difficulty": "medium",
      "description": "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class: Trie() Initializes the trie object.",
      "examples": [
        {
          "input": "[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"] [[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]",
          "output": "[null, null, true, false, true, null, true]",
          "explanation": "Trie trie = new Trie(); trie.insert(\"apple\"); trie.search(\"apple\"); // return True trie.search(\"app\"); // return False trie.startsWith(\"app\"); // return True trie.insert(\"app\"); trie.search(\"app\"); // return True"
        }
      ],
      "constraints": [
        "1 <= word.length, prefix.length <= 2000",
        "word and prefix consist only of lowercase English letters.",
        "At most 3 * 10^4 calls in total will be made to insert , search , and startsWith ."
      ]
    },
    {
      "slug": "design-add-and-search-words-data-structure",
      "title": "Design Add And Search Words Data Structure",
      "difficulty": "medium",
      "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class: WordDictionary() Initializes the object. void addWord(word) Adds word to the data structure, it can be matched later.",
      "examples": [
        {
          "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"] [[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
          "output": "[null,null,null,null,false,true,true,true]",
          "explanation": "WordDictionary wordDictionary = new WordDictionary(); wordDictionary.addWord(\"bad\"); wordDictionary.addWord(\"dad\"); wordDictionary.addWord(\"mad\"); wordDictionary.search(\"pad\"); // return False wordDictionary.search(\"bad\"); // return True wordDictionary.search(\".ad\"); // return True wordDictionary.search(\"b..\"); // return True"
        }
      ],
      "constraints": [
        "1 <= word.length <= 25",
        "word in addWord consists of lowercase English letters.",
        "word in search consist of '.' or lowercase English letters.",
        "There will be at most 2 dots in word for search queries."
      ]
    },
    {
      "slug": "word-search-ii",
      "title": "Word Search II",
      "difficulty": "hard",
      "description": "Given an m x n board of characters and a list of strings words , return all words on the board . Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
      "examples": [
        {
          "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
          "output": "[\"eat\",\"oath\"]"
        },
        {
          "input": "board = [[\"a\",\"b\"],[\"c\",\"d\"]], words = [\"abcb\"]",
          "output": "[]"
        }
      ],
      "constraints": [
        "m == board.length",
        "n == board[i].length",
        "1 <= m, n <= 12",
        "board[i][j] is a lowercase English letter."
      ]
    }
  ],
  "graphs": [
    {
      "slug": "word-ladder",
      "title": "Word Ladder",
      "difficulty": "hard",
      "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s 1 -> s 2 -> ... -> s k such that: Every adjacent pair of words differs by a single letter. Every s i for 1 <= i <= k is in wordList .",
      "examples": [
        {
          "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
          "output": "5",
          "explanation": "One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> cog\", which is 5 words long."
        },
        {
          "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
          "output": "0",
          "explanation": "The endWord \"cog\" is not in wordList, therefore there is no valid transformation sequence."
        }
      ],
      "constraints": [
        "1 <= beginWord.length <= 10",
        "endWord.length == beginWord.length",
        "1 <= wordList.length <= 5000",
        "wordList[i].length == beginWord.length"
      ]
    },
    {
      "slug": "surrounded-regions",
      "title": "Surrounded Regions",
      "difficulty": "medium",
      "description": "You are given an m x n matrix board containing letters 'X' and 'O' , capture regions that are surrounded : Connect : A cell is connected to adjacent cells horizontally or vertically. Region : To form a region connect every 'O' cell. Surround : A region is surrounded if none of the 'O' cells in that region are on the edge of the board.",
      "examples": [
        {
          "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "explanation": "In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded."
        },
        {
          "input": "board = [[\"X\"]]",
          "output": "[[\"X\"]]"
        }
      ],
      "constraints": [
        "m == board.length",
        "n == board[i].length",
        "1 <= m, n <= 200",
        "board[i][j] is 'X' or 'O' ."
      ]
    },
    {
      "slug": "clone-graph",
      "title": "Clone Graph",
      "difficulty": "medium",
      "description": "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value ( int ) and a list ( List[Node] ) of its neighbors.",
      "examples": [
        {
          "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
          "output": "[[2,4],[1,3],[2,4],[1,3]]",
          "explanation": "There are 4 nodes in the graph. 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4). 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3). 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4). 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3)."
        },
        {
          "input": "adjList = [[]]",
          "output": "[[]]",
          "explanation": "Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors."
        }
      ],
      "constraints": [
        "The number of nodes in the graph is in the range [0, 100] .",
        "1 <= Node.val <= 100",
        "Node.val is unique for each node.",
        "There are no repeated edges and no self-loops in the graph."
      ]
    },
    {
      "slug": "number-of-islands",
      "title": "Number of Islands",
      "difficulty": "medium",
      "description": "Given an m x n 2D binary grid grid which represents a map of '1' s (land) and '0' s (water), return the number of islands . An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
      "examples": [
        {
          "input": "grid = [ [\"1\",\"1\",\"1\",\"1\",\"0\"], [\"1\",\"1\",\"0\",\"1\",\"0\"], [\"1\",\"1\",\"0\",\"0\",\"0\"], [\"0\",\"0\",\"0\",\"0\",\"0\"] ]",
          "output": "1"
        },
        {
          "input": "grid = [ [\"1\",\"1\",\"0\",\"0\",\"0\"], [\"1\",\"1\",\"0\",\"0\",\"0\"], [\"0\",\"0\",\"1\",\"0\",\"0\"], [\"0\",\"0\",\"0\",\"1\",\"1\"] ]",
          "output": "3"
        }
      ],
      "constraints": [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 300",
        "grid[i][j] is '0' or '1' ."
      ]
    },
    {
      "slug": "course-schedule",
      "title": "Course Schedule",
      "difficulty": "medium",
      "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1 . You are given an array prerequisites where prerequisites[i] = [a i , b i ] indicates that you must take course b i first if you want to take course a i . For example, the pair [0, 1] , indicates that to take course 0 you have to first take course 1 .",
      "examples": [
        {
          "input": "numCourses = 2, prerequisites = [[1,0]]",
          "output": "true",
          "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
        },
        {
          "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
          "output": "false",
          "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible."
        }
      ],
      "constraints": [
        "1 <= numCourses <= 2000",
        "0 <= prerequisites.length <= 5000",
        "prerequisites[i].length == 2",
        "0 <= a i , b i < numCourses"
      ]
    },
    {
      "slug": "course-schedule-ii",
      "title": "Course Schedule II",
      "difficulty": "medium",
      "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1 . You are given an array prerequisites where prerequisites[i] = [a i , b i ] indicates that you must take course b i first if you want to take course a i . For example, the pair [0, 1] , indicates that to take course 0 you have to first take course 1 .",
      "examples": [
        {
          "input": "numCourses = 2, prerequisites = [[1,0]]",
          "output": "[0,1]",
          "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1]."
        },
        {
          "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
          "output": "[0,2,1,3]",
          "explanation": "There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3]."
        }
      ],
      "constraints": [
        "1 <= numCourses <= 2000",
        "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
        "prerequisites[i].length == 2",
        "0 <= a i , b i < numCourses"
      ]
    },
    {
      "slug": "graph-valid-tree",
      "title": "Graph Valid Tree",
      "difficulty": "medium",
      "description": "You have a graph of n nodes labeled from 0 to n - 1 . You are given an integer n and a list of edges where edges[i] = [a i , b i ] indicates that there is an undirected edge between nodes a i and b i in the graph. Return true if the edges of the given graph make up a valid tree, and false otherwise .",
      "examples": [
        {
          "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
          "output": "true"
        },
        {
          "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
          "output": "false"
        }
      ],
      "constraints": [
        "1 <= n <= 2000",
        "0 <= edges.length <= 5000",
        "edges[i].length == 2",
        "0 <= a i , b i < n"
      ]
    },
    {
      "slug": "walls-and-gates",
      "title": "Walls And Gates",
      "difficulty": "medium",
      "description": "You are given an m x n grid rooms initialized with these three possible values. -1 A wall or an obstacle. 0 A gate.",
      "examples": [
        {
          "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
          "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]"
        },
        {
          "input": "rooms = [[-1]]",
          "output": "[[-1]]"
        }
      ],
      "constraints": [
        "m == rooms.length",
        "n == rooms[i].length",
        "1 <= m, n <= 250",
        "rooms[i][j] is -1 , 0 , or 2^31 - 1 ."
      ]
    },
    {
      "slug": "number-of-connected-components-in-an-undirected-graph",
      "title": "Number of Connected Components In An Undirected Graph",
      "difficulty": "medium",
      "description": "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [a i , b i ] indicates that there is an edge between a i and b i in the graph. Return the number of connected components in the graph .",
      "examples": [
        {
          "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
          "output": "2"
        },
        {
          "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
          "output": "1"
        }
      ],
      "constraints": [
        "1 <= n <= 2000",
        "1 <= edges.length <= 5000",
        "edges[i].length == 2",
        "0 <= a i <= b i < n"
      ]
    },
    {
      "slug": "pacific-atlantic-water-flow",
      "title": "Pacific Atlantic Water Flow",
      "difficulty": "medium",
      "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean . The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. The island is partitioned into a grid of square cells.",
      "examples": [
        {
          "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
          "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
          "explanation": "The following cells can flow to the Pacific and Atlantic oceans, as shown below: [0,4]: [0,4] -> Pacific Ocean [0,4] -> Atlantic Ocean [1,3]: [1,3] -> [0,3] -> Pacific Ocean [1,3] -> [1,4] -> Atlantic Ocean [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean [1,4] -> Atlantic Ocean [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean [3,0]: [3,0] -> Pacific Ocean [3,0] -> [4,0] -> Atlantic Ocean [3,1]: [3,1] -> [3,0] -> Pacific Ocean [3,1] -> [4,1] -> Atlantic Ocean [4,0]: [4,0] -> Pacific Ocean [4,0] -> Atlantic Ocean Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans."
        },
        {
          "input": "heights = [[1]]",
          "output": "[[0,0]]",
          "explanation": "The water can flow from the only cell to the Pacific and Atlantic oceans."
        }
      ],
      "constraints": [
        "m == heights.length",
        "n == heights[r].length",
        "1 <= m, n <= 200",
        "0 <= heights[r][c] <= 10^5"
      ]
    },
    {
      "slug": "redundant-connection",
      "title": "Redundant Connection",
      "difficulty": "medium",
      "description": "In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n , with one additional edge added. The added edge has two different vertices chosen from 1 to n , and was not an edge that already existed.",
      "examples": [
        {
          "input": "edges = [[1,2],[1,3],[2,3]]",
          "output": "[2,3]"
        },
        {
          "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
          "output": "[1,4]"
        }
      ],
      "constraints": [
        "n == edges.length",
        "3 <= n <= 1000",
        "edges[i].length == 2",
        "1 <= a i < b i <= edges.length"
      ]
    },
    {
      "slug": "max-area-of-island",
      "title": "Max Area of Island",
      "difficulty": "medium",
      "description": "You are given an m x n binary matrix grid . An island is a group of 1 's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water. The area of an island is the number of cells with a value 1 in the island.",
      "examples": [
        {
          "input": "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]",
          "output": "6",
          "explanation": "The answer is not 11, because the island must be connected 4-directionally."
        },
        {
          "input": "grid = [[0,0,0,0,0,0,0,0]]",
          "output": "0"
        }
      ],
      "constraints": [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 50",
        "grid[i][j] is either 0 or 1 ."
      ]
    },
    {
      "slug": "rotting-oranges",
      "title": "Rotting Oranges",
      "difficulty": "medium",
      "description": "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange .",
      "examples": [
        {
          "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
          "output": "4"
        },
        {
          "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
          "output": "-1",
          "explanation": "The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally."
        }
      ],
      "constraints": [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 10",
        "grid[i][j] is 0 , 1 , or 2 ."
      ]
    }
  ],
  "advanced-graphs": [
    {
      "slug": "alien-dictionary",
      "title": "Alien Dictionary",
      "difficulty": "hard",
      "description": "There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you. You are given a list of strings words from the alien language's dictionary.",
      "examples": [
        {
          "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
          "output": "\"wertf\""
        },
        {
          "input": "words = [\"z\",\"x\"]",
          "output": "\"zx\""
        }
      ],
      "constraints": [
        "1 <= words.length <= 100",
        "1 <= words[i].length <= 100",
        "words[i] consists of only lowercase English letters."
      ]
    },
    {
      "slug": "reconstruct-itinerary",
      "title": "Reconstruct Itinerary",
      "difficulty": "hard",
      "description": "You are given a list of airline tickets where tickets[i] = [from i , to i ] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from \"JFK\" , thus, the itinerary must begin with \"JFK\" .",
      "examples": [
        {
          "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
          "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]"
        },
        {
          "input": "tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
          "output": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]",
          "explanation": "Another possible reconstruction is [\"JFK\",\"SFO\",\"ATL\",\"JFK\",\"ATL\",\"SFO\"] but it is larger in lexical order."
        }
      ],
      "constraints": [
        "1 <= tickets.length <= 300",
        "tickets[i].length == 2",
        "from i .length == 3",
        "to i .length == 3"
      ]
    },
    {
      "slug": "network-delay-time",
      "title": "Network Delay Time",
      "difficulty": "medium",
      "description": "You are given a network of n nodes, labeled from 1 to n . You are also given times , a list of travel times as directed edges times[i] = (u i , v i , w i ) , where u i is the source node, v i is the target node, and w i is the time it takes for a signal to travel from source to target. We will send a signal from a given node k .",
      "examples": [
        {
          "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
          "output": "2"
        },
        {
          "input": "times = [[1,2,1]], n = 2, k = 1",
          "output": "1"
        }
      ],
      "constraints": [
        "1 <= k <= n <= 100",
        "1 <= times.length <= 6000",
        "times[i].length == 3",
        "1 <= u i , v i <= n"
      ]
    },
    {
      "slug": "swim-in-rising-water",
      "title": "Swim In Rising Water",
      "difficulty": "hard",
      "description": "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j) . It starts raining, and water gradually rises over time. At time t , the water level is t , meaning any cell with elevation less than equal to t is submerged or reachable.",
      "examples": [
        {
          "input": "grid = [[0,2],[1,3]]",
          "output": "3",
          "explanation": "At time 0, you are in grid location (0, 0). You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0. You cannot reach point (1, 1) until time 3. When the depth of water is 3, we can swim anywhere inside the grid."
        },
        {
          "input": "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
          "output": "16",
          "explanation": "The final route is shown. We need to wait until time 16 so that (0, 0) and (4, 4) are connected."
        }
      ],
      "constraints": [
        "n == grid.length",
        "n == grid[i].length",
        "1 <= n <= 50",
        "0 <= grid[i][j] < n^2"
      ]
    },
    {
      "slug": "cheapest-flights-within-k-stops",
      "title": "Cheapest Flights Within K Stops",
      "difficulty": "medium",
      "description": "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [from i , to i , price i ] indicates that there is a flight from city from i to city to i with cost price i . You are also given three integers src , dst , and k , return the cheapest price from src to dst with at most k stops.",
      "examples": [
        {
          "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
          "output": "700",
          "explanation": "The graph is shown above. The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700. Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops."
        },
        {
          "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
          "output": "200",
          "explanation": "The graph is shown above. The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200."
        }
      ],
      "constraints": [
        "2 <= n <= 100",
        "0 <= flights.length <= (n * (n - 1) / 2)",
        "flights[i].length == 3",
        "0 <= from i , to i < n"
      ]
    },
    {
      "slug": "min-cost-to-connect-all-points",
      "title": "Min Cost to Connect All Points",
      "difficulty": "medium",
      "description": "You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [x i , y i ] . The cost of connecting two points [x i , y i ] and [x j , y j ] is the manhattan distance between them: |x i - x j | + |y i - y j | , where |val| denotes the absolute value of val . Return the minimum cost to make all points connected.",
      "examples": [
        {
          "input": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
          "output": "20",
          "explanation": "We can connect the points as shown above to get the minimum cost of 20. Notice that there is a unique path between every pair of points."
        },
        {
          "input": "points = [[3,12],[-2,5],[-4,1]]",
          "output": "18"
        }
      ],
      "constraints": [
        "1 <= points.length <= 1000",
        "-10^6 <= x i , y i <= 10^6",
        "All pairs (x i , y i ) are distinct."
      ]
    }
  ],
  "1d-dynamic-programming": [
    {
      "slug": "longest-palindromic-substring",
      "title": "Longest Palindromic Substring",
      "difficulty": "medium",
      "description": "Given a string s , return the longest palindromic substring in s .",
      "examples": [
        {
          "input": "s = \"babad\"",
          "output": "\"bab\"",
          "explanation": "\"aba\" is also a valid answer."
        },
        {
          "input": "s = \"cbbd\"",
          "output": "\"bb\""
        }
      ],
      "constraints": [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters."
      ]
    },
    {
      "slug": "climbing-stairs",
      "title": "Climbing Stairs",
      "difficulty": "easy",
      "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
      "examples": [
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps"
        },
        {
          "input": "n = 3",
          "output": "3",
          "explanation": "There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step"
        }
      ],
      "constraints": [
        "1 <= n <= 45"
      ]
    },
    {
      "slug": "decode-ways",
      "title": "Decode Ways",
      "difficulty": "medium",
      "description": "You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping: \"1\" -> 'A' \"2\" -> 'B' ... \"25\" -> 'Y' \"26\" -> 'Z' However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ( \"2\" and \"5\" vs \"25\" ).",
      "examples": [
        {
          "input": "s = \"12\"",
          "output": "2",
          "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
        },
        {
          "input": "s = \"226\"",
          "output": "3",
          "explanation": "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
        }
      ],
      "constraints": [
        "1 <= s.length <= 100",
        "s contains only digits and may contain leading zero(s)."
      ]
    },
    {
      "slug": "word-break",
      "title": "Word Break",
      "difficulty": "medium",
      "description": "Given a string s and a dictionary of strings wordDict , return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
      "examples": [
        {
          "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
          "output": "true",
          "explanation": "Return true because \"leetcode\" can be segmented as \"leet code\"."
        },
        {
          "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
          "output": "true",
          "explanation": "Return true because \"applepenapple\" can be segmented as \"apple pen apple\". Note that you are allowed to reuse a dictionary word."
        }
      ],
      "constraints": [
        "1 <= s.length <= 300",
        "1 <= wordDict.length <= 1000",
        "1 <= wordDict[i].length <= 20",
        "s and wordDict[i] consist of only lowercase English letters."
      ]
    },
    {
      "slug": "maximum-product-subarray",
      "title": "Maximum Product Subarray",
      "difficulty": "medium",
      "description": "Given an integer array nums , find a subarray that has the largest product, and return the product . The test cases are generated so that the answer will fit in a 32-bit integer. Note that the product of an array with a single element is the value of that element.",
      "examples": [
        {
          "input": "nums = [2,3,-2,4]",
          "output": "6",
          "explanation": "[2,3] has the largest product 6."
        },
        {
          "input": "nums = [-2,0,-1]",
          "output": "0",
          "explanation": "The result cannot be 2, because [-2,-1] is not a subarray."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 2 * 10^4",
        "-10 <= nums[i] <= 10",
        "The product of any subarray of nums is guaranteed to fit in a 32-bit integer."
      ]
    },
    {
      "slug": "house-robber",
      "title": "House Robber",
      "difficulty": "medium",
      "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night . Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police .",
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "4",
          "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4."
        },
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 100",
        "0 <= nums[i] <= 400"
      ]
    },
    {
      "slug": "house-robber-ii",
      "title": "House Robber II",
      "difficulty": "medium",
      "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle.",
      "examples": [
        {
          "input": "nums = [2,3,2]",
          "output": "3",
          "explanation": "You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses."
        },
        {
          "input": "nums = [1,2,3,1]",
          "output": "4",
          "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 100",
        "0 <= nums[i] <= 1000"
      ]
    },
    {
      "slug": "longest-increasing-subsequence",
      "title": "Longest Increasing Subsequence",
      "difficulty": "medium",
      "description": "Given an integer array nums , return the length of the longest strictly increasing subsequence .",
      "examples": [
        {
          "input": "nums = [10,9,2,5,3,7,101,18]",
          "output": "4",
          "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
        },
        {
          "input": "nums = [0,1,0,3,2,3]",
          "output": "4"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 2500",
        "-10^4 <= nums[i] <= 10^4"
      ]
    },
    {
      "slug": "coin-change",
      "title": "Coin Change",
      "difficulty": "medium",
      "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount . If that amount of money cannot be made up by any combination of the coins, return -1 .",
      "examples": [
        {
          "input": "coins = [1,2,5], amount = 11",
          "output": "3",
          "explanation": "11 = 5 + 5 + 1"
        },
        {
          "input": "coins = [2], amount = 3",
          "output": "-1"
        }
      ],
      "constraints": [
        "1 <= coins.length <= 12",
        "1 <= coins[i] <= 2^31 - 1",
        "0 <= amount <= 10^4"
      ]
    },
    {
      "slug": "partition-equal-subset-sum",
      "title": "Partition Equal Subset Sum",
      "difficulty": "medium",
      "description": "Given an integer array nums , return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise .",
      "examples": [
        {
          "input": "nums = [1,5,11,5]",
          "output": "true",
          "explanation": "The array can be partitioned as [1, 5, 5] and [11]."
        },
        {
          "input": "nums = [1,2,3,5]",
          "output": "false",
          "explanation": "The array cannot be partitioned into equal sum subsets."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 200",
        "1 <= nums[i] <= 100"
      ]
    },
    {
      "slug": "palindromic-substrings",
      "title": "Palindromic Substrings",
      "difficulty": "medium",
      "description": "Given a string s , return the number of palindromic substrings in it . A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.",
      "examples": [
        {
          "input": "s = \"abc\"",
          "output": "3",
          "explanation": "Three palindromic strings: \"a\", \"b\", \"c\"."
        },
        {
          "input": "s = \"aaa\"",
          "output": "6",
          "explanation": "Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."
        }
      ],
      "constraints": [
        "1 <= s.length <= 1000",
        "s consists of lowercase English letters."
      ]
    },
    {
      "slug": "min-cost-climbing-stairs",
      "title": "Min Cost Climbing Stairs",
      "difficulty": "easy",
      "description": "You are given an integer array cost where cost[i] is the cost of i^th step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0 , or the step with index 1 .",
      "examples": [
        {
          "input": "cost = [10, 15 ,20]",
          "output": "15",
          "explanation": "You will start at index 1. - Pay 15 and climb two steps to reach the top. The total cost is 15."
        },
        {
          "input": "cost = [ 1 ,100, 1 ,1, 1 ,100, 1 , 1 ,100, 1 ]",
          "output": "6",
          "explanation": "You will start at index 0. - Pay 1 and climb two steps to reach index 2. - Pay 1 and climb two steps to reach index 4. - Pay 1 and climb two steps to reach index 6. - Pay 1 and climb one step to reach index 7. - Pay 1 and climb two steps to reach index 9. - Pay 1 and climb one step to reach the top. The total cost is 6."
        }
      ],
      "constraints": [
        "2 <= cost.length <= 1000",
        "0 <= cost[i] <= 999"
      ]
    }
  ],
  "2d-dynamic-programming": [
    {
      "slug": "regular-expression-matching",
      "title": "Regular Expression Matching",
      "difficulty": "hard",
      "description": "Given an input string s and a pattern p , implement regular expression matching with support for '.' and '*' where: '.' Matches any single character.​​​​ '*' Matches zero or more of the preceding element. Return a boolean indicating whether the matching covers the entire input string (not partial).",
      "examples": [
        {
          "input": "s = \"aa\", p = \"a\"",
          "output": "false",
          "explanation": "\"a\" does not match the entire string \"aa\"."
        },
        {
          "input": "s = \"aa\", p = \"a*\"",
          "output": "true",
          "explanation": "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
        }
      ],
      "constraints": [
        "1 <= s.length <= 20",
        "1 <= p.length <= 20",
        "s contains only lowercase English letters.",
        "p contains only lowercase English letters, '.' , and '*' ."
      ]
    },
    {
      "slug": "unique-paths",
      "title": "Unique Paths",
      "difficulty": "medium",
      "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0] ). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1] ).",
      "examples": [
        {
          "input": "m = 3, n = 7",
          "output": "28"
        },
        {
          "input": "m = 3, n = 2",
          "output": "3",
          "explanation": "From the top-left corner, there are a total of 3 ways to reach the bottom-right corner: 1. Right -> Down -> Down 2. Down -> Down -> Right 3. Down -> Right -> Down"
        }
      ],
      "constraints": [
        "1 <= m, n <= 100"
      ]
    },
    {
      "slug": "edit-distance",
      "title": "Edit Distance",
      "difficulty": "medium",
      "description": "Given two strings word1 and word2 , return the minimum number of operations required to convert word1 to word2 . You have the following three operations permitted on a word: Insert a character Delete a character Replace a character",
      "examples": [
        {
          "input": "word1 = \"horse\", word2 = \"ros\"",
          "output": "3",
          "explanation": "horse -> rorse (replace 'h' with 'r') rorse -> rose (remove 'r') rose -> ros (remove 'e')"
        },
        {
          "input": "word1 = \"intention\", word2 = \"execution\"",
          "output": "5",
          "explanation": "intention -> inention (remove 't') inention -> enention (replace 'i' with 'e') enention -> exention (replace 'n' with 'x') exention -> exection (replace 'n' with 'c') exection -> execution (insert 'u')"
        }
      ],
      "constraints": [
        "0 <= word1.length, word2.length <= 500",
        "word1 and word2 consist of lowercase English letters."
      ]
    },
    {
      "slug": "interleaving-string",
      "title": "Interleaving String",
      "difficulty": "medium",
      "description": "Given strings s1 , s2 , and s3 , find whether s3 is formed by an interleaving of s1 and s2 . An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that: s = s 1 + s 2 + ... + s n t = t 1 + t 2 + ...",
      "examples": [
        {
          "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
          "output": "true",
          "explanation": "One way to obtain s3 is: Split s1 into s1 = \"aa\" + \"bc\" + \"c\", and s2 into s2 = \"dbbc\" + \"a\". Interleaving the two splits, we get \"aa\" + \"dbbc\" + \"bc\" + \"a\" + \"c\" = \"aadbbcbcac\". Since s3 can be obtained by interleaving s1 and s2, we return true."
        },
        {
          "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
          "output": "false",
          "explanation": "Notice how it is impossible to interleave s2 with any other string to obtain s3."
        }
      ],
      "constraints": [
        "0 <= s1.length, s2.length <= 100",
        "0 <= s3.length <= 200",
        "s1 , s2 , and s3 consist of lowercase English letters."
      ]
    },
    {
      "slug": "distinct-subsequences",
      "title": "Distinct Subsequences",
      "difficulty": "hard",
      "description": "Given two strings s and t, return the number of distinct subsequences of s which equals t. The test cases are generated so that the answer fits on a 32-bit signed integer.",
      "examples": [
        {
          "input": "s = \"rabbbit\", t = \"rabbit\"",
          "output": "3",
          "explanation": "As shown below, there are 3 ways you can generate \"rabbit\" from s. rabb b it ra b bbit rab b bit"
        },
        {
          "input": "s = \"babgbag\", t = \"bag\"",
          "output": "5",
          "explanation": "As shown below, there are 5 ways you can generate \"bag\" from s. ba b g bag ba bgba g b abgb ag ba b gb ag babg bag"
        }
      ],
      "constraints": [
        "1 <= s.length, t.length <= 1000",
        "s and t consist of English letters."
      ]
    },
    {
      "slug": "best-time-to-buy-and-sell-stock-with-cooldown",
      "title": "Best Time to Buy And Sell Stock With Cooldown",
      "difficulty": "medium",
      "description": "You are given an array prices where prices[i] is the price of a given stock on the i^th day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
      "examples": [
        {
          "input": "prices = [1,2,3,0,2]",
          "output": "3",
          "explanation": "transactions = [buy, sell, cooldown, buy, sell]"
        },
        {
          "input": "prices = [1]",
          "output": "0"
        }
      ],
      "constraints": [
        "1 <= prices.length <= 5000",
        "0 <= prices[i] <= 1000"
      ]
    },
    {
      "slug": "burst-balloons",
      "title": "Burst Balloons",
      "difficulty": "hard",
      "description": "You are given n balloons, indexed from 0 to n - 1 . Each balloon is painted with a number on it represented by an array nums . You are asked to burst all the balloons.",
      "examples": [
        {
          "input": "nums = [3,1,5,8]",
          "output": "167",
          "explanation": "nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> [] coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167"
        },
        {
          "input": "nums = [1,5]",
          "output": "10"
        }
      ],
      "constraints": [
        "n == nums.length",
        "1 <= n <= 300",
        "0 <= nums[i] <= 100"
      ]
    },
    {
      "slug": "longest-increasing-path-in-a-matrix",
      "title": "Longest Increasing Path In a Matrix",
      "difficulty": "hard",
      "description": "Given an m x n integers matrix , return the length of the longest increasing path in matrix . From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).",
      "examples": [
        {
          "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
          "output": "4",
          "explanation": "The longest increasing path is [1, 2, 6, 9] ."
        },
        {
          "input": "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
          "output": "4",
          "explanation": "The longest increasing path is [3, 4, 5, 6] . Moving diagonally is not allowed."
        }
      ],
      "constraints": [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 <= m, n <= 200",
        "0 <= matrix[i][j] <= 2^31 - 1"
      ]
    },
    {
      "slug": "target-sum",
      "title": "Target Sum",
      "difficulty": "medium",
      "description": "You are given an integer array nums and an integer target . You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers. For example, if nums = [2, 1] , you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression \"+2-1\" .",
      "examples": [
        {
          "input": "nums = [1,1,1,1,1], target = 3",
          "output": "5",
          "explanation": "There are 5 ways to assign symbols to make the sum of nums be target 3. -1 + 1 + 1 + 1 + 1 = 3 +1 - 1 + 1 + 1 + 1 = 3 +1 + 1 - 1 + 1 + 1 = 3 +1 + 1 + 1 - 1 + 1 = 3 +1 + 1 + 1 + 1 - 1 = 3"
        },
        {
          "input": "nums = [1], target = 1",
          "output": "1"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 20",
        "0 <= nums[i] <= 1000",
        "0 <= sum(nums[i]) <= 1000",
        "-1000 <= target <= 1000"
      ]
    },
    {
      "slug": "coin-change-ii",
      "title": "Coin Change II",
      "difficulty": "medium",
      "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount . If that amount of money cannot be made up by any combination of the coins, return 0 .",
      "examples": [
        {
          "input": "amount = 5, coins = [1,2,5]",
          "output": "4",
          "explanation": "there are four ways to make up the amount: 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1"
        },
        {
          "input": "amount = 3, coins = [2]",
          "output": "0",
          "explanation": "the amount of 3 cannot be made up just with coins of 2."
        }
      ],
      "constraints": [
        "1 <= coins.length <= 300",
        "1 <= coins[i] <= 5000",
        "All the values of coins are unique .",
        "0 <= amount <= 5000"
      ]
    },
    {
      "slug": "longest-common-subsequence",
      "title": "Longest Common Subsequence",
      "difficulty": "medium",
      "description": "Given two strings text1 and text2 , return the length of their longest common subsequence . If there is no common subsequence , return 0 . A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
      "examples": [
        {
          "input": "text1 = \"abcde\", text2 = \"ace\"",
          "output": "3",
          "explanation": "The longest common subsequence is \"ace\" and its length is 3."
        },
        {
          "input": "text1 = \"abc\", text2 = \"abc\"",
          "output": "3",
          "explanation": "The longest common subsequence is \"abc\" and its length is 3."
        }
      ],
      "constraints": [
        "1 <= text1.length, text2.length <= 1000",
        "text1 and text2 consist of only lowercase English characters."
      ]
    }
  ],
  "greedy": [
    {
      "slug": "jump-game-ii",
      "title": "Jump Game II",
      "difficulty": "medium",
      "description": "You are given a 0-indexed array of integers nums of length n . You are initially positioned at index 0. Each element nums[i] represents the maximum length of a forward jump from index i .",
      "examples": [
        {
          "input": "nums = [2,3,1,1,4]",
          "output": "2",
          "explanation": "The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index."
        },
        {
          "input": "nums = [2,3,0,1,4]",
          "output": "2"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^4",
        "0 <= nums[i] <= 1000",
        "It's guaranteed that you can reach nums[n - 1] ."
      ]
    },
    {
      "slug": "maximum-subarray",
      "title": "Maximum Subarray",
      "difficulty": "medium",
      "description": "Given an integer array nums , find the subarray with the largest sum, and return its sum .",
      "examples": [
        {
          "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          "output": "6",
          "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The subarray [1] has the largest sum 1."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4"
      ]
    },
    {
      "slug": "jump-game",
      "title": "Jump Game",
      "difficulty": "medium",
      "description": "You are given an integer array nums . You are initially positioned at the array's first index , and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise .",
      "examples": [
        {
          "input": "nums = [2,3,1,1,4]",
          "output": "true",
          "explanation": "Jump 1 step from index 0 to 1, then 3 steps to the last index."
        },
        {
          "input": "nums = [3,2,1,0,4]",
          "output": "false",
          "explanation": "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
        }
      ],
      "constraints": [
        "1 <= nums.length <= 10^4",
        "0 <= nums[i] <= 10^5"
      ]
    },
    {
      "slug": "gas-station",
      "title": "Gas Station",
      "difficulty": "medium",
      "description": "There are n gas stations along a circular route, where the amount of gas at the i^th station is gas[i] . You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the i^th station to its next (i + 1)^th station. You begin the journey with an empty tank at one of the gas stations.",
      "examples": [
        {
          "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
          "output": "3",
          "explanation": "Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4 Travel to station 4. Your tank = 4 - 1 + 5 = 8 Travel to station 0. Your tank = 8 - 2 + 1 = 7 Travel to station 1. Your tank = 7 - 3 + 2 = 6 Travel to station 2. Your tank = 6 - 4 + 3 = 5 Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3. Therefore, return 3 as the starting index."
        },
        {
          "input": "gas = [2,3,4], cost = [3,4,3]",
          "output": "-1",
          "explanation": "You can't start at station 0 or 1, as there is not enough gas to travel to the next station. Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4 Travel to station 0. Your tank = 4 - 3 + 2 = 3 Travel to station 1. Your tank = 3 - 3 + 3 = 3 You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3. Therefore, you can't travel around the circuit once no matter where you start."
        }
      ],
      "constraints": [
        "n == gas.length == cost.length",
        "1 <= n <= 10^5",
        "0 <= gas[i], cost[i] <= 10^4",
        "The input is generated such that the answer is unique."
      ]
    },
    {
      "slug": "valid-parenthesis-string",
      "title": "Valid Parenthesis String",
      "difficulty": "medium",
      "description": "Given a string s containing only three types of characters: '(' , ')' and '*' , return true if s is valid . The following rules define a valid string: Any left parenthesis '(' must have a corresponding right parenthesis ')' . Any right parenthesis ')' must have a corresponding left parenthesis '(' .",
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "true"
        },
        {
          "input": "s = \"(*)\"",
          "output": "true"
        }
      ],
      "constraints": [
        "1 <= s.length <= 100",
        "s[i] is '(' , ')' or '*' ."
      ]
    },
    {
      "slug": "partition-labels",
      "title": "Partition Labels",
      "difficulty": "medium",
      "description": "You are given a string s . We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string \"ababcc\" can be partitioned into [\"abab\", \"cc\"] , but partitions such as [\"aba\", \"bcc\"] or [\"ab\", \"ab\", \"cc\"] are invalid.",
      "examples": [
        {
          "input": "s = \"ababcbacadefegdehijhklij\"",
          "output": "[9,7,8]",
          "explanation": "The partition is \"ababcbaca\", \"defegde\", \"hijhklij\". This is a partition so that each letter appears in at most one part. A partition like \"ababcbacadefegde\", \"hijhklij\" is incorrect, because it splits s into less parts."
        },
        {
          "input": "s = \"eccbbbbdec\"",
          "output": "[10]"
        }
      ],
      "constraints": [
        "1 <= s.length <= 500",
        "s consists of lowercase English letters."
      ]
    },
    {
      "slug": "hand-of-straights",
      "title": "Hand of Straights",
      "difficulty": "medium",
      "description": "Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize , and consists of groupSize consecutive cards. Given an integer array hand where hand[i] is the value written on the i^th card and an integer groupSize , return true if she can rearrange the cards, or false otherwise.",
      "examples": [
        {
          "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          "output": "true",
          "explanation": "Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]"
        },
        {
          "input": "hand = [1,2,3,4,5], groupSize = 4",
          "output": "false",
          "explanation": "Alice's hand can not be rearranged into groups of 4."
        }
      ],
      "constraints": [
        "1 <= hand.length <= 10^4",
        "0 <= hand[i] <= 10^9",
        "1 <= groupSize <= hand.length"
      ]
    },
    {
      "slug": "merge-triplets-to-form-target-triplet",
      "title": "Merge Triplets to Form Target Triplet",
      "difficulty": "medium",
      "description": "A triplet is an array of three integers. You are given a 2D integer array triplets , where triplets[i] = [a i , b i , c i ] describes the i^th triplet . You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.",
      "examples": [
        {
          "input": "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
          "output": "true",
          "explanation": "Perform the following operations: - Choose the first and last triplets [ [2,5,3] ,[1,8,4], [1,7,5] ]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4], [2,7,5] ] The target triplet [2,7,5] is now an element of triplets."
        },
        {
          "input": "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]",
          "output": "false",
          "explanation": "It is impossible to have [3,2,5] as an element because there is no 2 in any of the triplets."
        }
      ],
      "constraints": [
        "1 <= triplets.length <= 10^5",
        "triplets[i].length == target.length == 3",
        "1 <= a i , b i , c i , x, y, z <= 1000"
      ]
    }
  ],
  "intervals": [
    {
      "slug": "merge-intervals",
      "title": "Merge Intervals",
      "difficulty": "medium",
      "description": "Given an array of intervals where intervals[i] = [start i , end i ] , merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input .",
      "examples": [
        {
          "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          "output": "[[1,6],[8,10],[15,18]]",
          "explanation": "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
        },
        {
          "input": "intervals = [[1,4],[4,5]]",
          "output": "[[1,5]]",
          "explanation": "Intervals [1,4] and [4,5] are considered overlapping."
        }
      ],
      "constraints": [
        "1 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= start i <= end i <= 10^4"
      ]
    },
    {
      "slug": "insert-interval",
      "title": "Insert Interval",
      "difficulty": "medium",
      "description": "You are given an array of non-overlapping intervals intervals where intervals[i] = [start i , end i ] represent the start and the end of the i^th interval and intervals is sorted in ascending order by start i . You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by start i and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).",
      "examples": [
        {
          "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
          "output": "[[1,5],[6,9]]"
        },
        {
          "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
          "output": "[[1,2],[3,10],[12,16]]",
          "explanation": "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10]."
        }
      ],
      "constraints": [
        "0 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= start i <= end i <= 10^5",
        "intervals is sorted by start i in ascending order."
      ]
    },
    {
      "slug": "meeting-rooms",
      "title": "Meeting Rooms",
      "difficulty": "easy",
      "description": "Given an array of meeting time intervals where intervals[i] = [start i , end i ] , determine if a person could attend all meetings.",
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "false"
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "true"
        }
      ],
      "constraints": [
        "0 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= start i < end i <= 10^6"
      ]
    },
    {
      "slug": "meeting-rooms-ii",
      "title": "Meeting Rooms II",
      "difficulty": "medium",
      "description": "Given an array of meeting time intervals intervals where intervals[i] = [start i , end i ] , return the minimum number of conference rooms required .",
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "2"
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "1"
        }
      ],
      "constraints": [
        "1 <= intervals.length <= 10^4",
        "0 <= start i < end i <= 10^6"
      ]
    },
    {
      "slug": "non-overlapping-intervals",
      "title": "Non Overlapping Intervals",
      "difficulty": "medium",
      "description": "Given an array of intervals intervals where intervals[i] = [start i , end i ] , return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping . Note that intervals which only touch at a point are non-overlapping . For example, [1, 2] and [2, 3] are non-overlapping.",
      "examples": [
        {
          "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
          "output": "1",
          "explanation": "[1,3] can be removed and the rest of the intervals are non-overlapping."
        },
        {
          "input": "intervals = [[1,2],[1,2],[1,2]]",
          "output": "2",
          "explanation": "You need to remove two [1,2] to make the rest of the intervals non-overlapping."
        }
      ],
      "constraints": [
        "1 <= intervals.length <= 10^5",
        "intervals[i].length == 2",
        "-5 * 10^4 <= start i < end i <= 5 * 10^4"
      ]
    },
    {
      "slug": "minimum-interval-to-include-each-query",
      "title": "Minimum Interval to Include Each Query",
      "difficulty": "hard",
      "description": "You are given a 2D integer array intervals , where intervals[i] = [left i , right i ] describes the i^th interval starting at left i and ending at right i (inclusive) . The size of an interval is defined as the number of integers it contains, or more formally right i - left i + 1 . You are also given an integer array queries .",
      "examples": [
        {
          "input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
          "output": "[3,3,1,4]",
          "explanation": "The queries are processed as follows: - Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3. - Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3. - Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1. - Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4."
        },
        {
          "input": "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]",
          "output": "[2,-1,4,6]",
          "explanation": "The queries are processed as follows: - Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2. - Query = 19: None of the intervals contain 19. The answer is -1. - Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4. - Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6."
        }
      ],
      "constraints": [
        "1 <= intervals.length <= 10^5",
        "1 <= queries.length <= 10^5",
        "intervals[i].length == 2",
        "1 <= left i <= right i <= 10^7"
      ]
    }
  ],
  "math-geometry": [
    {
      "slug": "multiply-strings",
      "title": "Multiply Strings",
      "difficulty": "medium",
      "description": "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2 , also represented as a string. Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.",
      "examples": [
        {
          "input": "num1 = \"2\", num2 = \"3\"",
          "output": "\"6\""
        },
        {
          "input": "num1 = \"123\", num2 = \"456\"",
          "output": "\"56088\""
        }
      ],
      "constraints": [
        "1 <= num1.length, num2.length <= 200",
        "num1 and num2 consist of digits only.",
        "Both num1 and num2 do not contain any leading zero, except the number 0 itself."
      ]
    },
    {
      "slug": "rotate-image",
      "title": "Rotate Image",
      "difficulty": "medium",
      "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place , which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
      "examples": [
        {
          "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[[7,4,1],[8,5,2],[9,6,3]]"
        },
        {
          "input": "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
          "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
        }
      ],
      "constraints": [
        "n == matrix.length == matrix[i].length",
        "1 <= n <= 20",
        "-1000 <= matrix[i][j] <= 1000"
      ]
    },
    {
      "slug": "powx-n",
      "title": "Pow(x, n)",
      "difficulty": "medium",
      "description": "Implement pow(x, n) , which calculates x raised to the power n (i.e., x^n ).",
      "examples": [
        {
          "input": "x = 2.00000, n = 10",
          "output": "1024.00000"
        },
        {
          "input": "x = 2.10000, n = 3",
          "output": "9.26100"
        }
      ],
      "constraints": [
        "-100.0 < x < 100.0",
        "-2^31 <= n <= 2^31-1",
        "n is an integer.",
        "Either x is not zero or n > 0 ."
      ]
    },
    {
      "slug": "spiral-matrix",
      "title": "Spiral Matrix",
      "difficulty": "medium",
      "description": "Given an m x n matrix , return all elements of the matrix in spiral order .",
      "examples": [
        {
          "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[1,2,3,6,9,8,7,4,5]"
        },
        {
          "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
          "output": "[1,2,3,4,8,12,11,10,9,5,6,7]"
        }
      ],
      "constraints": [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 <= m, n <= 10",
        "-100 <= matrix[i][j] <= 100"
      ]
    },
    {
      "slug": "plus-one",
      "title": "Plus One",
      "difficulty": "easy",
      "description": "You are given a large integer represented as an integer array digits , where each digits[i] is the i^th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0 's.",
      "examples": [
        {
          "input": "digits = [1,2,3]",
          "output": "[1,2,4]",
          "explanation": "The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4]."
        },
        {
          "input": "digits = [4,3,2,1]",
          "output": "[4,3,2,2]",
          "explanation": "The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2]."
        }
      ],
      "constraints": [
        "1 <= digits.length <= 100",
        "0 <= digits[i] <= 9",
        "digits does not contain any leading 0 's."
      ]
    },
    {
      "slug": "set-matrix-zeroes",
      "title": "Set Matrix Zeroes",
      "difficulty": "medium",
      "description": "Given an m x n integer matrix matrix , if an element is 0 , set its entire row and column to 0 's. You must do it in place .",
      "examples": [
        {
          "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
          "output": "[[1,0,1],[0,0,0],[1,0,1]]"
        },
        {
          "input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
          "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"
        }
      ],
      "constraints": [
        "m == matrix.length",
        "n == matrix[0].length",
        "1 <= m, n <= 200",
        "-2^31 <= matrix[i][j] <= 2^31 - 1"
      ]
    },
    {
      "slug": "happy-number",
      "title": "Happy Number",
      "difficulty": "easy",
      "description": "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.",
      "examples": [
        {
          "input": "n = 19",
          "output": "true",
          "explanation": "1^2 + 9^2 = 82 8^2 + 2^2 = 68 6^2 + 8^2 = 100 1^2 + 0^2 + 0^2 = 1"
        },
        {
          "input": "n = 2",
          "output": "false"
        }
      ],
      "constraints": [
        "1 <= n <= 2^31 - 1"
      ]
    },
    {
      "slug": "detect-squares",
      "title": "Detect Squares",
      "difficulty": "medium",
      "description": "You are given a stream of points on the X-Y plane. Design an algorithm that: Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.",
      "examples": [
        {
          "input": "[\"DetectSquares\", \"add\", \"add\", \"add\", \"count\", \"count\", \"add\", \"count\"] [[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]",
          "output": "[null, null, null, null, 1, 0, null, 2]",
          "explanation": "DetectSquares detectSquares = new DetectSquares(); detectSquares.add([3, 10]); detectSquares.add([11, 2]); detectSquares.add([3, 2]); detectSquares.count([11, 10]); // return 1. You can choose: // - The first, second, and third points detectSquares.count([14, 8]); // return 0. The query point cannot form a square with any points in the data structure. detectSquares.add([11, 2]); // Adding duplicate points is allowed. detectSquares.count([11, 10]); // return 2. You can choose: // - The first, second, and third points // - The first, third, and fourth points"
        }
      ],
      "constraints": [
        "point.length == 2",
        "0 <= x, y <= 1000",
        "At most 3000 calls in total will be made to add and count ."
      ]
    }
  ],
  "bit-manipulation": [
    {
      "slug": "reverse-integer",
      "title": "Reverse Integer",
      "difficulty": "medium",
      "description": "Given a signed 32-bit integer x , return x with its digits reversed . If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1] , then return 0 . Assume the environment does not allow you to store 64-bit integers (signed or unsigned).",
      "examples": [
        {
          "input": "x = 123",
          "output": "321"
        },
        {
          "input": "x = -123",
          "output": "-321"
        }
      ],
      "constraints": [
        "-2^31 <= x <= 2^31 - 1"
      ]
    },
    {
      "slug": "single-number",
      "title": "Single Number",
      "difficulty": "easy",
      "description": "Given a non-empty array of integers nums , every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
      "examples": [
        {
          "input": "nums = [2,2,1]",
          "output": "1"
        },
        {
          "input": "nums = [4,1,2,1,2]",
          "output": "4"
        }
      ],
      "constraints": [
        "1 <= nums.length <= 3 * 10^4",
        "-3 * 10^4 <= nums[i] <= 3 * 10^4",
        "Each element in the array appears twice except for one element which appears only once."
      ]
    },
    {
      "slug": "reverse-bits",
      "title": "Reverse Bits",
      "difficulty": "easy",
      "description": "Reverse bits of a given 32 bits signed integer.",
      "examples": [
        {
          "input": "n = 43261596",
          "output": "964176192",
          "explanation": "Integer Binary 43261596 00000010100101000001111010011100 964176192 00111001011110000010100101000000"
        },
        {
          "input": "n = 2147483644",
          "output": "1073741822",
          "explanation": "Integer Binary 2147483644 01111111111111111111111111111100 1073741822 00111111111111111111111111111110"
        }
      ],
      "constraints": [
        "0 <= n <= 2^31 - 2",
        "n is even."
      ]
    },
    {
      "slug": "number-of-1-bits",
      "title": "Number of 1 Bits",
      "difficulty": "easy",
      "description": "Given a positive integer n , write a function that returns the number of set bits in its binary representation (also known as the Hamming weight ).",
      "examples": [
        {
          "input": "n = 11",
          "output": "3",
          "explanation": "The input binary string 1011 has a total of three set bits."
        },
        {
          "input": "n = 128",
          "output": "1",
          "explanation": "The input binary string 10000000 has a total of one set bit."
        }
      ],
      "constraints": [
        "1 <= n <= 2^31 - 1"
      ]
    },
    {
      "slug": "missing-number",
      "title": "Missing Number",
      "difficulty": "easy",
      "description": "Given an array nums containing n distinct numbers in the range [0, n] , return the only number in the range that is missing from the array.",
      "examples": [
        {
          "input": "nums = [3,0,1]",
          "output": "2",
          "explanation": "n = 3 since there are 3 numbers, so all numbers are in the range [0,3] . 2 is the missing number in the range since it does not appear in nums ."
        },
        {
          "input": "nums = [0,1]",
          "output": "2",
          "explanation": "n = 2 since there are 2 numbers, so all numbers are in the range [0,2] . 2 is the missing number in the range since it does not appear in nums ."
        }
      ],
      "constraints": [
        "n == nums.length",
        "1 <= n <= 10^4",
        "0 <= nums[i] <= n",
        "All the numbers of nums are unique ."
      ]
    },
    {
      "slug": "counting-bits",
      "title": "Counting Bits",
      "difficulty": "easy",
      "description": "Given an integer n , return an array ans of length n + 1 such that for each i ( 0 <= i <= n ) , ans[i] is the number of 1 's in the binary representation of i .",
      "examples": [
        {
          "input": "n = 2",
          "output": "[0,1,1]",
          "explanation": "0 --> 0 1 --> 1 2 --> 10"
        },
        {
          "input": "n = 5",
          "output": "[0,1,1,2,1,2]",
          "explanation": "0 --> 0 1 --> 1 2 --> 10 3 --> 11 4 --> 100 5 --> 101"
        }
      ],
      "constraints": [
        "0 <= n <= 10^5",
        "It is very easy to come up with a solution with a runtime of O(n log n) . Can you do it in linear time O(n) and possibly in a single pass?",
        "Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?"
      ]
    },
    {
      "slug": "sum-of-two-integers",
      "title": "Sum of Two Integers",
      "difficulty": "medium",
      "description": "Given two integers a and b , return the sum of the two integers without using the operators + and - .",
      "examples": [
        {
          "input": "a = 1, b = 2",
          "output": "3"
        },
        {
          "input": "a = 2, b = 3",
          "output": "5"
        }
      ],
      "constraints": [
        "-1000 <= a, b <= 1000"
      ]
    }
  ]
};

type ProblemTestMeta = Pick<Problem, "functionName" | "testCases">;

const PROVIDED_TESTS: Record<string, ProblemTestMeta> = {
  "contains-duplicate": {
    functionName: "containsDuplicate",
    testCases: [
      { args: "[1,2,3,1]", expected: "True" },
      { args: "[1,2,3,4]", expected: "False" },
      { args: "[1,1,1,3,3,4,3,2,4,2]", expected: "True" },
    ],
  },
  "valid-anagram": {
    functionName: "isAnagram",
    testCases: [
      { args: '"anagram", "nagaram"', expected: "True" },
      { args: '"rat", "car"', expected: "False" },
      { args: '"a", "a"', expected: "True" },
    ],
  },
  "two-sum": {
    functionName: "twoSum",
    testCases: [
      { args: "[2,7,11,15], 9", expected: "[0,1]" },
      { args: "[3,2,4], 6", expected: "[1,2]" },
      { args: "[3,3], 6", expected: "[0,1]" },
    ],
  },
  "group-anagrams": {
    functionName: "groupAnagrams",
    testCases: [
      { args: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { args: '[""]', expected: '[[""]]' },
      { args: '["a"]', expected: '[["a"]]' },
    ],
  },
  "top-k-frequent-elements": {
    functionName: "topKFrequent",
    testCases: [
      { args: "[1,1,1,2,2,3], 2", expected: "[1,2]" },
      { args: "[1], 1", expected: "[1]" },
    ],
  },
  "product-of-array-except-self": {
    functionName: "productExceptSelf",
    testCases: [
      { args: "[1,2,3,4]", expected: "[24,12,8,6]" },
      { args: "[-1,1,0,-3,3]", expected: "[0,0,9,0,0]" },
    ],
  },
  "longest-consecutive-sequence": {
    functionName: "longestConsecutive",
    testCases: [
      { args: "[100,4,200,1,3,2]", expected: "4" },
      { args: "[0,3,7,2,5,8,4,6,0,1]", expected: "9" },
    ],
  },
  "valid-palindrome": {
    functionName: "isPalindrome",
    testCases: [
      { args: '"A man, a plan, a canal: Panama"', expected: "True" },
      { args: '"race a car"', expected: "False" },
      { args: '" "', expected: "True" },
    ],
  },
  "two-sum-ii-input-array-is-sorted": {
    functionName: "twoSumII",
    testCases: [
      { args: "[2,7,11,15], 9", expected: "[1,2]" },
      { args: "[2,3,4], 6", expected: "[1,3]" },
      { args: "[-1,0], -1", expected: "[1,2]" },
    ],
  },
  "3sum": {
    functionName: "threeSum",
    testCases: [
      { args: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
      { args: "[0,1,1]", expected: "[]" },
      { args: "[0,0,0]", expected: "[[0,0,0]]" },
    ],
  },
  "container-with-most-water": {
    functionName: "maxArea",
    testCases: [
      { args: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { args: "[1,1]", expected: "1" },
    ],
  },
  "trapping-rain-water": {
    functionName: "trap",
    testCases: [
      { args: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { args: "[4,2,0,3,2,5]", expected: "9" },
    ],
  },
  "best-time-to-buy-and-sell-stock": {
    functionName: "maxProfit",
    testCases: [
      { args: "[7,1,5,3,6,4]", expected: "5" },
      { args: "[7,6,4,3,1]", expected: "0" },
    ],
  },
  "longest-substring-without-repeating-characters": {
    functionName: "lengthOfLongestSubstring",
    testCases: [
      { args: '"abcabcbb"', expected: "3" },
      { args: '"bbbbb"', expected: "1" },
      { args: '"pwwkew"', expected: "3" },
    ],
  },
  "longest-repeating-character-replacement": {
    functionName: "characterReplacement",
    testCases: [
      { args: '"ABAB", 2', expected: "4" },
      { args: '"AABABBA", 1', expected: "4" },
    ],
  },
  "permutation-in-string": {
    functionName: "checkInclusion",
    testCases: [
      { args: '"ab", "eidbaooo"', expected: "True" },
      { args: '"ab", "eidboaoo"', expected: "False" },
    ],
  },
  "minimum-window-substring": {
    functionName: "minWindow",
    testCases: [
      { args: '"ADOBECODEBANC", "ABC"', expected: "BANC" },
      { args: '"a", "a"', expected: "a" },
      { args: '"a", "aa"', expected: "" },
    ],
  },
  "sliding-window-maximum": {
    functionName: "maxSlidingWindow",
    testCases: [
      { args: "[1,3,-1,-3,5,3,6,7], 3", expected: "[3,3,5,5,6,7]" },
      { args: "[1], 1", expected: "[1]" },
    ],
  },
  "valid-parentheses": {
    functionName: "isValid",
    testCases: [
      { args: '"()"', expected: "True" },
      { args: '"()[]{}"', expected: "True" },
      { args: '"(]"', expected: "False" },
      { args: '"([)]"', expected: "False" },
    ],
  },
  "daily-temperatures": {
    functionName: "dailyTemperatures",
    testCases: [
      { args: "[73,74,75,71,69,72,76,73]", expected: "[1,1,4,2,1,1,0,0]" },
      { args: "[30,40,50,60]", expected: "[1,1,1,0]" },
    ],
  },
  "car-fleet": {
    functionName: "carFleet",
    testCases: [
      { args: "12, [10,8,0,5,3], [2,4,1,1,3]", expected: "3" },
      { args: "10, [3], [3]", expected: "1" },
    ],
  },
  "largest-rectangle-in-histogram": {
    functionName: "largestRectangleArea",
    testCases: [
      { args: "[2,1,5,6,2,3]", expected: "10" },
      { args: "[2,4]", expected: "4" },
    ],
  },
  "binary-search": {
    functionName: "search",
    testCases: [
      { args: "[-1,0,3,5,9,12], 9", expected: "4" },
      { args: "[-1,0,3,5,9,12], 2", expected: "-1" },
    ],
  },
  "search-a-2d-matrix": {
    functionName: "searchMatrix",
    testCases: [
      { args: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3", expected: "True" },
      { args: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13", expected: "False" },
    ],
  },
  "koko-eating-bananas": {
    functionName: "minEatingSpeed",
    testCases: [
      { args: "[3,6,7,11], 8", expected: "4" },
      { args: "[30,11,23,4,20], 5", expected: "30" },
    ],
  },
  "find-minimum-in-rotated-sorted-array": {
    functionName: "findMin",
    testCases: [
      { args: "[3,4,5,1,2]", expected: "1" },
      { args: "[4,5,6,7,0,1,2]", expected: "0" },
      { args: "[11,13,15,17]", expected: "11" },
    ],
  },
  "search-in-rotated-sorted-array": {
    functionName: "searchRotated",
    testCases: [
      { args: "[4,5,6,7,0,1,2], 0", expected: "4" },
      { args: "[4,5,6,7,0,1,2], 3", expected: "-1" },
      { args: "[1], 0", expected: "-1" },
    ],
  },
  "median-of-two-sorted-arrays": {
    functionName: "findMedianSortedArrays",
    testCases: [
      { args: "[1,3], [2]", expected: "2.0" },
      { args: "[1,2], [3,4]", expected: "2.5" },
    ],
  },
  "reverse-linked-list": {
    functionName: "reverseList",
    testCases: [{ args: "None", expected: "None" }],
  },
  "linked-list-cycle": {
    functionName: "hasCycle",
    testCases: [{ args: "None", expected: "False" }],
  },
  "add-two-numbers": {
    functionName: "addTwoNumbers",
    testCases: [{ args: "None, None", expected: "design" }],
  },
  "find-the-duplicate-number": {
    functionName: "findDuplicate",
    testCases: [
      { args: "[1,3,4,2,2]", expected: "design" },
      { args: "[3,1,3,4,2]", expected: "design" },
    ],
  },
  "maximum-depth-of-binary-tree": {
    functionName: "maxDepth",
    testCases: [{ args: "None", expected: "0" }],
  },
  "invert-binary-tree": {
    functionName: "invertTree",
    testCases: [{ args: "None", expected: "None" }],
  },
  "binary-tree-level-order-traversal": {
    functionName: "levelOrder",
    testCases: [{ args: "None", expected: "[]" }],
  },
  "binary-tree-right-side-view": {
    functionName: "rightSideView",
    testCases: [{ args: "None", expected: "[]" }],
  },
  "validate-binary-search-tree": {
    functionName: "isValidBST",
    testCases: [{ args: "None", expected: "True" }],
  },
  "construct-binary-tree-from-preorder-and-inorder-traversal": {
    functionName: "buildTree",
    testCases: [
      { args: "[3,9,20,15,7], [9,3,15,20,7]", expected: "design" },
      { args: "[-1], [-1]", expected: "design" },
    ],
  },
  "climbing-stairs": {
    functionName: "climbStairs",
    testCases: [
      { args: "2", expected: "2" },
      { args: "3", expected: "3" },
      { args: "5", expected: "8" },
    ],
  },
  "coin-change": {
    functionName: "coinChange",
    testCases: [
      { args: "[1,2,5], 11", expected: "3" },
      { args: "[2], 3", expected: "-1" },
    ],
  },
  "house-robber": {
    functionName: "rob",
    testCases: [
      { args: "[1,2,3,1]", expected: "4" },
      { args: "[2,7,9,3,1]", expected: "12" },
    ],
  },
  "longest-increasing-subsequence": {
    functionName: "lengthOfLIS",
    testCases: [
      { args: "[10,9,2,5,3,7,101,18]", expected: "4" },
      { args: "[0,1,0,3,2,3]", expected: "4" },
    ],
  },
  "number-of-islands": {
    functionName: "numIslands",
    testCases: [
      {
        args: '[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]',
        expected: "1",
      },
      {
        args: '[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]',
        expected: "3",
      },
    ],
  },
  "course-schedule": {
    functionName: "canFinish",
    testCases: [
      { args: "2, [[1,0]]", expected: "True" },
      { args: "2, [[1,0],[0,1]]", expected: "False" },
    ],
  },
  "maximum-subarray": {
    functionName: "maxSubArray",
    testCases: [
      { args: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { args: "[1]", expected: "1" },
      { args: "[5,4,-1,7,8]", expected: "23" },
    ],
  },
  "jump-game": {
    functionName: "canJump",
    testCases: [
      { args: "[2,3,1,1,4]", expected: "True" },
      { args: "[3,2,1,0,4]", expected: "False" },
    ],
  },
  "merge-intervals": {
    functionName: "merge",
    testCases: [
      { args: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { args: "[[1,4],[4,5]]", expected: "[[1,5]]" },
    ],
  },
  "rotate-image": {
    functionName: "rotate",
    testCases: [
      { args: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "design" },
    ],
  },
  "single-number": {
    functionName: "singleNumber",
    testCases: [
      { args: "[2,2,1]", expected: "1" },
      { args: "[4,1,2,1,2]", expected: "4" },
      { args: "[1]", expected: "1" },
    ],
  },
  "missing-number": {
    functionName: "missingNumber",
    testCases: [
      { args: "[3,0,1]", expected: "2" },
      { args: "[0,1]", expected: "2" },
      { args: "[9,6,4,2,3,5,7,0,1]", expected: "8" },
    ],
  },
};

const PROVIDED_STARTERS: Record<string, string> = {
  "contains-duplicate": `class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        `,
  "valid-anagram": `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        `,
  "two-sum": `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `,
  "group-anagrams": `class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        `,
  "top-k-frequent-elements": `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        `,
  "encode-decode-strings": `class Solution:\n    def encode(self, strs: List[str]) -> str:\n        \n\n    def decode(self, s: str) -> List[str]:\n        `,
  "product-array-except-self": `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        `,
  "valid-sudoku": `class Solution:\n    def isValidSudoku(self, board: List[List[str]]) -> bool:\n        `,
  "longest-consecutive-sequence": `class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        `,
  "valid-palindrome": `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        `,
  "two-sum-ii": `class Solution:\n    def twoSumII(self, numbers: List[int], target: int) -> List[int]:\n        `,
  "3sum": `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        `,
  "container-with-most-water": `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        `,
  "trapping-rain-water": `class Solution:\n    def trap(self, height: List[int]) -> int:\n        `,
  "best-time-to-buy-sell-stock": `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        `,
  "longest-substring-without-repeating": `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        `,
  "longest-repeating-character-replacement": `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        `,
  "permutation-in-string": `class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        `,
  "minimum-window-substring": `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        `,
  "sliding-window-maximum": `class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        `,
  "valid-parentheses": `class Solution:\n    def isValid(self, s: str) -> bool:\n        `,
  "min-stack": `class MinStack:\n    def __init__(self):\n        \n\n    def push(self, val: int) -> None:\n        \n\n    def pop(self) -> None:\n        \n\n    def top(self) -> int:\n        \n\n    def getMin(self) -> int:\n        `,
  "evaluate-reverse-polish-notation": `class Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        `,
  "generate-parentheses": `class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        `,
  "daily-temperatures": `class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        `,
  "car-fleet": `class Solution:\n    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:\n        `,
  "largest-rectangle-histogram": `class Solution:\n    def largestRectangleArea(self, heights: List[int]) -> int:\n        `,
  "binary-search": `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        `,
  "search-2d-matrix": `class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        `,
  "koko-eating-bananas": `class Solution:\n    def minEatingSpeed(self, piles: List[int], h: int) -> int:\n        `,
  "find-minimum-rotated-sorted-array": `class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        `,
  "search-rotated-sorted-array": `class Solution:\n    def searchRotated(self, nums: List[int], target: int) -> int:\n        `,
  "time-based-key-value-store": `class TimeMap:\n    def __init__(self):\n        \n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        \n\n    def get(self, key: str, timestamp: int) -> str:\n        `,
  "median-two-sorted-arrays": `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        `,
  "reverse-linked-list": `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        `,
  "merge-two-sorted-lists": `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        `,
  "reorder-list": `class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        `,
  "remove-nth-node-end": `class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        `,
  "copy-list-random-pointer": `class Solution:\n    def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:\n        `,
  "add-two-numbers": `class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        `,
  "linked-list-cycle": `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        `,
  "find-duplicate-number": `class Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        `,
  "lru-cache": `class LRUCache:\n    def __init__(self, capacity: int):\n        \n\n    def get(self, key: int) -> int:\n        \n\n    def put(self, key: int, value: int) -> None:\n        `,
  "merge-k-sorted-lists": `class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        `,
  "reverse-nodes-k-group": `class Solution:\n    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        `,
  "invert-binary-tree": `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        `,
  "maximum-depth-binary-tree": `class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        `,
  "diameter-binary-tree": `class Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        `,
  "balanced-binary-tree": `class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        `,
  "same-tree": `class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        `,
  "subtree-another-tree": `class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        `,
  "lowest-common-ancestor-bst": `class Solution:\n    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n        `,
  "binary-tree-level-order": `class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        `,
  "binary-tree-right-side-view": `class Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        `,
  "count-good-nodes": `class Solution:\n    def goodNodes(self, root: TreeNode) -> int:\n        `,
  "validate-bst": `class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        `,
  "kth-smallest-bst": `class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        `,
  "construct-binary-tree": `class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        `,
  "binary-tree-max-path-sum": `class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        `,
  "serialize-deserialize-binary-tree": `class Codec:\n    def serialize(self, root: Optional[TreeNode]) -> str:\n        \n\n    def deserialize(self, data: str) -> Optional[TreeNode]:\n        `,
  "kth-largest-stream": `class KthLargest:\n    def __init__(self, k: int, nums: List[int]):\n        \n\n    def add(self, val: int) -> int:\n        `,
  "last-stone-weight": `class Solution:\n    def lastStoneWeight(self, stones: List[int]) -> int:\n        `,
  "k-closest-points-origin": `class Solution:\n    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:\n        `,
  "kth-largest-array": `class Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        `,
  "task-scheduler": `class Solution:\n    def leastInterval(self, tasks: List[str], n: int) -> int:\n        `,
  "design-twitter": `class Twitter:\n    def __init__(self):\n        \n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        \n\n    def getNewsFeed(self, userId: int) -> List[int]:\n        \n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        \n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        `,
  "find-median-data-stream": `class MedianFinder:\n    def __init__(self):\n        \n\n    def addNum(self, num: int) -> None:\n        \n\n    def findMedian(self) -> float:\n        `,
  "subsets": `class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        `,
  "combination-sum": `class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        `,
  "permutations": `class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        `,
  "subsets-ii": `class Solution:\n    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:\n        `,
  "combination-sum-ii": `class Solution:\n    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:\n        `,
  "word-search": `class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        `,
  "palindrome-partitioning": `class Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        `,
  "letter-combinations-phone": `class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        `,
  "n-queens": `class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        `,
  "implement-trie": `class Trie:\n    def __init__(self):\n        \n\n    def insert(self, word: str) -> None:\n        \n\n    def search(self, word: str) -> bool:\n        \n\n    def startsWith(self, prefix: str) -> bool:\n        `,
  "design-add-search-words": `class WordDictionary:\n    def __init__(self):\n        \n\n    def addWord(self, word: str) -> None:\n        \n\n    def search(self, word: str) -> bool:\n        `,
  "word-search-ii": `class Solution:\n    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:\n        `,
  "number-of-islands": `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        `,
  "clone-graph": `class Solution:\n    def cloneGraph(self, node: Optional[Node]) -> Optional[Node]:\n        `,
  "max-area-island": `class Solution:\n    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:\n        `,
  "pacific-atlantic-water-flow": `class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        `,
  "surrounded-regions": `class Solution:\n    def solve(self, board: List[List[str]]) -> None:\n        `,
  "rotting-oranges": `class Solution:\n    def orangesRotting(self, grid: List[List[int]]) -> int:\n        `,
  "walls-and-gates": `class Solution:\n    def wallsAndGates(self, rooms: List[List[int]]) -> None:\n        `,
  "course-schedule": `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        `,
  "course-schedule-ii": `class Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        `,
  "redundant-connection": `class Solution:\n    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:\n        `,
  "number-connected-components": `class Solution:\n    def countComponents(self, n: int, edges: List[List[int]]) -> int:\n        `,
  "graph-valid-tree": `class Solution:\n    def validTree(self, n: int, edges: List[List[int]]) -> bool:\n        `,
  "word-ladder": `class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        `,
  "reconstruct-itinerary": `class Solution:\n    def findItinerary(self, tickets: List[List[str]]) -> List[str]:\n        `,
  "min-cost-connect-points": `class Solution:\n    def minCostConnectPoints(self, points: List[List[int]]) -> int:\n        `,
  "network-delay-time": `class Solution:\n    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:\n        `,
  "swim-rising-water": `class Solution:\n    def swimInWater(self, grid: List[List[int]]) -> int:\n        `,
  "alien-dictionary": `class Solution:\n    def alienOrder(self, words: List[str]) -> str:\n        `,
  "cheapest-flights-k-stops": `class Solution:\n    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:\n        `,
  "climbing-stairs": `class Solution:\n    def climbStairs(self, n: int) -> int:\n        `,
  "min-cost-climbing-stairs": `class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -> int:\n        `,
  "house-robber": `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        `,
  "house-robber-ii": `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        `,
  "longest-palindromic-substring": `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        `,
  "palindromic-substrings": `class Solution:\n    def countSubstrings(self, s: str) -> int:\n        `,
  "decode-ways": `class Solution:\n    def numDecodings(self, s: str) -> int:\n        `,
  "coin-change": `class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        `,
  "maximum-product-subarray": `class Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        `,
  "word-break": `class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        `,
  "longest-increasing-subsequence": `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        `,
  "partition-equal-subset-sum": `class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        `,
  "unique-paths": `class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        `,
  "longest-common-subsequence": `class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        `,
  "buy-sell-stock-cooldown": `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        `,
  "coin-change-ii": `class Solution:\n    def change(self, amount: int, coins: List[int]) -> int:\n        `,
  "target-sum": `class Solution:\n    def findTargetSumWays(self, nums: List[int], target: int) -> int:\n        `,
  "interleaving-string": `class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        `,
  "longest-increasing-path-matrix": `class Solution:\n    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:\n        `,
  "distinct-subsequences": `class Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        `,
  "edit-distance": `class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        `,
  "burst-balloons": `class Solution:\n    def maxCoins(self, nums: List[int]) -> int:\n        `,
  "regular-expression-matching": `class Solution:\n    def isMatch(self, s: str, t: str) -> bool:\n        `,
  "maximum-subarray": `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        `,
  "jump-game": `class Solution:\n    def canJump(self, nums: List[int]) -> bool:\n        `,
  "jump-game-ii": `class Solution:\n    def jump(self, nums: List[int]) -> int:\n        `,
  "gas-station": `class Solution:\n    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:\n        `,
  "hand-of-straights": `class Solution:\n    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:\n        `,
  "merge-triplets-target": `class Solution:\n    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:\n        `,
  "partition-labels": `class Solution:\n    def partitionLabels(self, s: str) -> List[int]:\n        `,
  "valid-parenthesis-string": `class Solution:\n    def checkValidString(self, s: str) -> bool:\n        `,
  "insert-interval": `class Solution:\n    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:\n        `,
  "merge-intervals": `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        `,
  "non-overlapping-intervals": `class Solution:\n    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:\n        `,
  "meeting-rooms": `class Solution:\n    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:\n        `,
  "meeting-rooms-ii": `class Solution:\n    def minMeetingRooms(self, intervals: List[List[int]]) -> int:\n        `,
  "minimum-interval-query": `class Solution:\n    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:\n        `,
  "rotate-image": `class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        `,
  "spiral-matrix": `class Solution:\n    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:\n        `,
  "set-matrix-zeroes": `class Solution:\n    def setZeroes(self, matrix: List[List[int]]) -> None:\n        `,
  "happy-number": `class Solution:\n    def isHappy(self, n: int) -> bool:\n        `,
  "plus-one": `class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        `,
  "pow-x-n": `class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        `,
  "multiply-strings": `class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        `,
  "detect-squares": `class DetectSquares:\n    def __init__(self):\n        \n\n    def add(self, point: List[int]) -> None:\n        \n\n    def count(self, point: List[int]) -> int:\n        `,
  "single-number": `class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        `,
  "number-of-1-bits": `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        `,
  "counting-bits": `class Solution:\n    def countBits(self, n: int) -> List[int]:\n        `,
  "reverse-bits": `class Solution:\n    def reverseBits(self, n: int) -> int:\n        `,
  "missing-number": `class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        `,
  "sum-of-two-integers": `class Solution:\n    def getSum(self, a: int, b: int) -> int:\n        `,
  "reverse-integer": `class Solution:\n    def reverse(self, x: int) -> int:\n        `,
};

const FUNCTION_NAME_BY_STARTER_KEY: Record<string, string> = {
  "contains-duplicate": "containsDuplicate",
  "valid-anagram": "isAnagram",
  "two-sum": "twoSum",
  "group-anagrams": "groupAnagrams",
  "top-k-frequent-elements": "topKFrequent",
  // encode-decode-strings has two methods; tests call encode by default
  "encode-decode-strings": "encode",
  "product-array-except-self": "productExceptSelf",
  "valid-sudoku": "isValidSudoku",
  "longest-consecutive-sequence": "longestConsecutive",
  "valid-palindrome": "isPalindrome",
  "two-sum-ii": "twoSumII",
  "3sum": "threeSum",
  "container-with-most-water": "maxArea",
  "trapping-rain-water": "trap",
  "best-time-to-buy-sell-stock": "maxProfit",
  "longest-substring-without-repeating": "lengthOfLongestSubstring",
  "longest-repeating-character-replacement": "characterReplacement",
  "permutation-in-string": "checkInclusion",
  "minimum-window-substring": "minWindow",
  "sliding-window-maximum": "maxSlidingWindow",
  "valid-parentheses": "isValid",
  "evaluate-reverse-polish-notation": "evalRPN",
  "generate-parentheses": "generateParenthesis",
  "daily-temperatures": "dailyTemperatures",
  "car-fleet": "carFleet",
  "largest-rectangle-histogram": "largestRectangleArea",
  "binary-search": "search",
  "search-2d-matrix": "searchMatrix",
  "koko-eating-bananas": "minEatingSpeed",
  "find-minimum-rotated-sorted-array": "findMin",
  "search-rotated-sorted-array": "searchRotated",
  "median-two-sorted-arrays": "findMedianSortedArrays",
  "reverse-linked-list": "reverseList",
  "merge-two-sorted-lists": "mergeTwoLists",
  "reorder-list": "reorderList",
  "remove-nth-node-end": "removeNthFromEnd",
  "copy-list-random-pointer": "copyRandomList",
  "add-two-numbers": "addTwoNumbers",
  "linked-list-cycle": "hasCycle",
  "find-duplicate-number": "findDuplicate",
  "merge-k-sorted-lists": "mergeKLists",
  "reverse-nodes-k-group": "reverseKGroup",
  "invert-binary-tree": "invertTree",
  "maximum-depth-binary-tree": "maxDepth",
  "diameter-binary-tree": "diameterOfBinaryTree",
  "balanced-binary-tree": "isBalanced",
  "same-tree": "isSameTree",
  "subtree-another-tree": "isSubtree",
  "lowest-common-ancestor-bst": "lowestCommonAncestor",
  "binary-tree-level-order": "levelOrder",
  "binary-tree-right-side-view": "rightSideView",
  "count-good-nodes": "goodNodes",
  "validate-bst": "isValidBST",
  "kth-smallest-bst": "kthSmallest",
  "construct-binary-tree": "buildTree",
  "binary-tree-max-path-sum": "maxPathSum",
  "subsets": "subsets",
  "combination-sum": "combinationSum",
  "permutations": "permute",
  "subsets-ii": "subsetsWithDup",
  "combination-sum-ii": "combinationSum2",
  "word-search": "exist",
  "palindrome-partitioning": "partition",
  "letter-combinations-phone": "letterCombinations",
  "n-queens": "solveNQueens",
  "word-search-ii": "findWords",
  "number-of-islands": "numIslands",
  "clone-graph": "cloneGraph",
  "max-area-island": "maxAreaOfIsland",
  "pacific-atlantic-water-flow": "pacificAtlantic",
  "surrounded-regions": "solve",
  "rotting-oranges": "orangesRotting",
  "walls-and-gates": "wallsAndGates",
  "course-schedule": "canFinish",
  "course-schedule-ii": "findOrder",
  "redundant-connection": "findRedundantConnection",
  "number-connected-components": "countComponents",
  "graph-valid-tree": "validTree",
  "word-ladder": "ladderLength",
  "reconstruct-itinerary": "findItinerary",
  "min-cost-connect-points": "minCostConnectPoints",
  "network-delay-time": "networkDelayTime",
  "swim-rising-water": "swimInWater",
  "alien-dictionary": "alienOrder",
  "cheapest-flights-k-stops": "findCheapestPrice",
  "climbing-stairs": "climbStairs",
  "min-cost-climbing-stairs": "minCostClimbingStairs",
  "house-robber": "rob",
  "house-robber-ii": "rob",
  "longest-palindromic-substring": "longestPalindrome",
  "palindromic-substrings": "countSubstrings",
  "decode-ways": "numDecodings",
  "coin-change": "coinChange",
  "maximum-product-subarray": "maxProduct",
  "word-break": "wordBreak",
  "longest-increasing-subsequence": "lengthOfLIS",
  "partition-equal-subset-sum": "canPartition",
  "unique-paths": "uniquePaths",
  "longest-common-subsequence": "longestCommonSubsequence",
  "buy-sell-stock-cooldown": "maxProfit",
  "coin-change-ii": "change",
  "target-sum": "findTargetSumWays",
  "interleaving-string": "isInterleave",
  "longest-increasing-path-matrix": "longestIncreasingPath",
  "distinct-subsequences": "numDistinct",
  "edit-distance": "minDistance",
  "burst-balloons": "maxCoins",
  "regular-expression-matching": "isMatch",
  "maximum-subarray": "maxSubArray",
  "jump-game": "canJump",
  "jump-game-ii": "jump",
  "gas-station": "canCompleteCircuit",
  "hand-of-straights": "isNStraightHand",
  "merge-triplets-target": "mergeTriplets",
  "partition-labels": "partitionLabels",
  "valid-parenthesis-string": "checkValidString",
  "insert-interval": "insert",
  "merge-intervals": "merge",
  "non-overlapping-intervals": "eraseOverlapIntervals",
  "meeting-rooms": "canAttendMeetings",
  "meeting-rooms-ii": "minMeetingRooms",
  "minimum-interval-query": "minInterval",
  "rotate-image": "rotate",
  "spiral-matrix": "spiralOrder",
  "set-matrix-zeroes": "setZeroes",
  "happy-number": "isHappy",
  "plus-one": "plusOne",
  "pow-x-n": "myPow",
  "multiply-strings": "multiply",
  "single-number": "singleNumber",
  "number-of-1-bits": "hammingWeight",
  "counting-bits": "countBits",
  "reverse-bits": "reverseBits",
  "missing-number": "missingNumber",
  "sum-of-two-integers": "getSum",
  "reverse-integer": "reverse",
};

function slugToFunctionName(slug: string): string {
  const parts = slug
    .split("-")
    .filter(Boolean)
    .map((p) => p.replace(/[^a-zA-Z0-9]/g, ""));
  if (parts.length === 0) return "solve";
  return parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

const STARTER_SLUG_ALIASES: Record<string, string> = {
  "encode-and-decode-strings": "encode-decode-strings",
  "product-of-array-except-self": "product-array-except-self",
  "two-sum-ii-input-array-is-sorted": "two-sum-ii",
  "best-time-to-buy-and-sell-stock": "best-time-to-buy-sell-stock",
  "longest-substring-without-repeating-characters": "longest-substring-without-repeating",
  "largest-rectangle-in-histogram": "largest-rectangle-histogram",
  "search-a-2d-matrix": "search-2d-matrix",
  "find-minimum-in-rotated-sorted-array": "find-minimum-rotated-sorted-array",
  "search-in-rotated-sorted-array": "search-rotated-sorted-array",
  "median-of-two-sorted-arrays": "median-two-sorted-arrays",
  "remove-nth-node-from-end-of-list": "remove-nth-node-end",
  "copy-list-with-random-pointer": "copy-list-random-pointer",
  "reverse-nodes-in-k-group": "reverse-nodes-k-group",
  "find-the-duplicate-number": "find-duplicate-number",
  "maximum-depth-of-binary-tree": "maximum-depth-binary-tree",
  "diameter-of-binary-tree": "diameter-binary-tree",
  "subtree-of-another-tree": "subtree-another-tree",
  "lowest-common-ancestor-of-a-binary-search-tree": "lowest-common-ancestor-bst",
  "binary-tree-level-order-traversal": "binary-tree-level-order",
  "count-good-nodes-in-binary-tree": "count-good-nodes",
  "validate-binary-search-tree": "validate-bst",
  "kth-smallest-element-in-a-bst": "kth-smallest-bst",
  "construct-binary-tree-from-preorder-and-inorder-traversal": "construct-binary-tree",
  "binary-tree-maximum-path-sum": "binary-tree-max-path-sum",
  "serialize-and-deserialize-binary-tree": "serialize-deserialize-binary-tree",
  "kth-largest-element-in-a-stream": "kth-largest-stream",
  "k-closest-points-to-origin": "k-closest-points-origin",
  "kth-largest-element-in-an-array": "kth-largest-array",
  "find-median-from-data-stream": "find-median-data-stream",
  "letter-combinations-of-a-phone-number": "letter-combinations-phone",
  "implement-trie-prefix-tree": "implement-trie",
  "design-add-and-search-words-data-structure": "design-add-search-words",
  "max-area-of-island": "max-area-island",
  "number-of-connected-components-in-an-undirected-graph": "number-connected-components",
  "min-cost-to-connect-all-points": "min-cost-connect-points",
  "swim-in-rising-water": "swim-rising-water",
  "cheapest-flights-within-k-stops": "cheapest-flights-k-stops",
  "best-time-to-buy-and-sell-stock-with-cooldown": "buy-sell-stock-cooldown",
  "longest-increasing-path-in-a-matrix": "longest-increasing-path-matrix",
  "merge-triplets-to-form-target-triplet": "merge-triplets-target",
  "minimum-interval-to-include-each-query": "minimum-interval-query",
  "powx-n": "pow-x-n",
};

const DESIGN_TESTCASE = [{ args: "", expected: "design" }];
const LL_DEFAULT_TESTCASES = [{ args: "None", expected: "None" }];
const TREE_DEFAULT_TESTCASES = [{ args: "None", expected: "None" }];

const DESIGN_SLUGS = new Set<string>([
  "min-stack",
  "lru-cache",
  "time-based-key-value-store",
  "design-twitter",
  "find-median-from-data-stream",
  "kth-largest-element-in-a-stream",
  "implement-trie-prefix-tree",
  "design-add-and-search-words-data-structure",
  "detect-squares",
]);

export const NEETCODE_PROBLEMS: Record<string, Problem[]> = Object.fromEntries(
  Object.entries(RAW_NEETCODE_PROBLEMS).map(([patternSlug, problems]) => [
    patternSlug,
    problems.map((p) => {
      const starterKey = STARTER_SLUG_ALIASES[p.slug] ?? p.slug;
      const starterCode = PROVIDED_STARTERS[starterKey] ?? "class Solution:\n    pass\n";
      const desiredFunctionName =
        FUNCTION_NAME_BY_STARTER_KEY[starterKey] ??
        PROVIDED_TESTS[p.slug]?.functionName ??
        slugToFunctionName(p.slug);
      const meta = PROVIDED_TESTS[p.slug] ?? {
        functionName: desiredFunctionName,
        testCases: [],
      };
      // Force alignment with LeetCode starter method signature.
      meta.functionName = desiredFunctionName;
      let testCases = meta.testCases;

      // Guarantee every problem has at least one testcase entry.
      if (!testCases || testCases.length === 0) {
        if (DESIGN_SLUGS.has(p.slug)) {
          testCases = DESIGN_TESTCASE;
        } else if (patternSlug === "linked-list") {
          testCases = LL_DEFAULT_TESTCASES;
        } else if (patternSlug === "trees") {
          // Prefer the "real" simple ones where specified
          if (p.slug === "maximum-depth-of-binary-tree") {
            testCases = [{ args: "None", expected: "0" }];
          } else if (p.slug === "invert-binary-tree") {
            testCases = [{ args: "None", expected: "None" }];
          } else {
            testCases = TREE_DEFAULT_TESTCASES;
          }
        } else {
          // Fallback so "Run Tests" can always run without hiding.
          testCases = DESIGN_TESTCASE;
        }
      }

      return { ...p, ...meta, testCases, starterCode };
    }),
  ]),
) as Record<string, Problem[]>;
