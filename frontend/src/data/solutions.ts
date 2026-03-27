import { NEETCODE_PROBLEMS } from "./neetcode";

const patternTitleBySlug: Record<string, string> = {
  "arrays-hashing": "Arrays & Hashing",
  "two-pointers": "Two Pointers",
  "sliding-window": "Sliding Window",
  stack: "Stack",
  "binary-search": "Binary Search",
  "linked-list": "Linked List",
  trees: "Trees",
  "heap-priority-queue": "Heap / Priority Queue",
  backtracking: "Backtracking",
  tries: "Tries",
  graphs: "Graphs",
  "advanced-graphs": "Advanced Graphs",
  "1d-dynamic-programming": "1D Dynamic Programming",
  "2d-dynamic-programming": "2D Dynamic Programming",
  greedy: "Greedy",
  intervals: "Intervals",
  "math-geometry": "Math & Geometry",
  "bit-manipulation": "Bit Manipulation",
};

function solutionComingSoon(patternName: string, problemTitle: string): string {
  return `# Pattern: ${patternName}
from typing import Any


def solve() -> Any:
    """
    Solution coming soon for: ${problemTitle}
    """
    return None


# Example test call
print(solve())
`;
}

export const SOLUTIONS: Record<string, string> = {
  // ARRAYS & HASHING
  "contains-duplicate": `# Pattern: Arrays & Hashing
def containsDuplicate(nums: list[int]) -> bool:
    seen: set[int] = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

print(containsDuplicate([1,2,3,1]))
`,

  "valid-anagram": `# Pattern: Arrays & Hashing
def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    count: dict[str, int] = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
    return True

print(isAnagram("anagram", "nagaram"))
`,

  "two-sum": `# Pattern: Arrays & Hashing
def twoSum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

print(twoSum([2,7,11,15], 9))
`,

  "group-anagrams": `# Pattern: Arrays & Hashing
from collections import defaultdict
def groupAnagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[tuple[str, ...], list[str]] = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())

print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
`,

  "top-k-frequent-elements": `# Pattern: Arrays & Hashing
from collections import Counter
def topKFrequent(nums: list[int], k: int) -> list[int]:
    count: Counter[int] = Counter(nums)
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    result: list[int] = []
    for i in range(len(buckets) - 1, 0, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result

print(topKFrequent([1,1,1,2,2,3], 2))
`,

  "encode-and-decode-strings": `# Pattern: Arrays & Hashing
def encode(strs: list[str]) -> str:
    return "".join(f"{len(s)}#{s}" for s in strs)

def decode(s: str) -> list[str]:
    result: list[str] = []
    i = 0
    while i < len(s):
        j = s.index("#", i)
        length = int(s[i:j])
        result.append(s[j+1:j+1+length])
        i = j + 1 + length
    return result

print(decode(encode(["hello","world"])))
`,

  "product-of-array-except-self": `# Pattern: Arrays & Hashing
def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    result: list[int] = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result

print(productExceptSelf([1,2,3,4]))
`,

  "valid-sudoku": `# Pattern: Arrays & Hashing
def isValidSudoku(board: list[list[str]]) -> bool:
    rows: list[set[str]] = [set() for _ in range(9)]
    cols: list[set[str]] = [set() for _ in range(9)]
    boxes: list[set[str]] = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == ".":
                continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
    return True

print(isValidSudoku([
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"],
]))
`,

  "longest-consecutive-sequence": `# Pattern: Arrays & Hashing
def longestConsecutive(nums: list[int]) -> int:
    num_set: set[int] = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)
    return longest

print(longestConsecutive([100,4,200,1,3,2]))
`,

  // TWO POINTERS
  "valid-palindrome": `# Pattern: Two Pointers
def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

print(isPalindrome("A man, a plan, a canal: Panama"))
`,

  "two-sum-ii-input-array-is-sorted": `# Pattern: Two Pointers
def twoSumII(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1
    return []

print(twoSumII([2,7,11,15], 9))
`,

  "3sum": `# Pattern: Two Pointers
def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result: list[list[int]] = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return result

print(threeSum([-1,0,1,2,-1,-4]))
`,

  "container-with-most-water": `# Pattern: Two Pointers
def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        water = min(height[left], height[right]) * (right - left)
        max_water = max(max_water, water)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water

print(maxArea([1,8,6,2,5,4,8,3,7]))
`,

  "trapping-rain-water": `# Pattern: Two Pointers
def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max = 0
    right_max = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
`,

  // SLIDING WINDOW
  "best-time-to-buy-and-sell-stock": `# Pattern: Sliding Window
def maxProfit(prices: list[int]) -> int:
    min_price = float("inf")
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit

print(maxProfit([7,1,5,3,6,4]))
`,

  "longest-substring-without-repeating-characters": `# Pattern: Sliding Window
def lengthOfLongestSubstring(s: str) -> int:
    seen: set[str] = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

print(lengthOfLongestSubstring("abcabcbb"))
`,

  "longest-repeating-character-replacement": `# Pattern: Sliding Window
def characterReplacement(s: str, k: int) -> int:
    count: dict[str, int] = {}
    left = 0
    max_freq = 0
    best = 0
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_freq = max(max_freq, count[s[right]])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best

print(characterReplacement("AABABBA", 1))
`,

  "permutation-in-string": `# Pattern: Sliding Window
from collections import Counter
def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    need = Counter(s1)
    window = Counter(s2[:len(s1)])
    if window == need:
        return True
    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left_char = s2[i - len(s1)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]
        if window == need:
            return True
    return False

print(checkInclusion("ab", "eidbaooo"))
`,

  "minimum-window-substring": `# Pattern: Sliding Window
from collections import Counter
def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""
    need = Counter(t)
    missing = len(t)
    left = 0
    start = 0
    end = 0
    for right, char in enumerate(s, 1):
        if need[char] > 0:
            missing -= 1
        need[char] -= 1
        if missing == 0:
            while need[s[left]] < 0:
                need[s[left]] += 1
                left += 1
            if end == 0 or right - left < end - start:
                start, end = left, right
            need[s[left]] += 1
            missing += 1
            left += 1
    return s[start:end]

print(minWindow("ADOBECODEBANC", "ABC"))
`,

  "sliding-window-maximum": `# Pattern: Sliding Window
from collections import deque
def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    dq: deque[int] = deque()
    result: list[int] = []
    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if dq[0] == i - k:
            dq.popleft()
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
`,

  // STACK
  "valid-parentheses": `# Pattern: Stack
def isValid(s: str) -> bool:
    stack: list[str] = []
    mapping: dict[str, str] = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else "#"
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

print(isValid("()[]{}"))
`,

  "min-stack": `# Pattern: Stack
class MinStack:
    def __init__(self) -> None:
        self.stack: list[int] = []
        self.min_stack: list[int] = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        curr_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(curr_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]

s = MinStack()
s.push(-2); s.push(0); s.push(-3)
print(s.getMin())
`,

  "evaluate-reverse-polish-notation": `# Pattern: Stack
def evalRPN(tokens: list[str]) -> int:
    stack: list[int] = []
    def add(a: int, b: int) -> int: return a + b
    def sub(a: int, b: int) -> int: return a - b
    def mul(a: int, b: int) -> int: return a * b
    def div(a: int, b: int) -> int: return int(a / b)  # truncates toward 0
    ops: dict[str, callable] = {"+": add, "-": sub, "*": mul, "/": div}
    for token in tokens:
        if token in ops:
            b = stack.pop()
            a = stack.pop()
            stack.append(ops[token](a, b))
        else:
            stack.append(int(token))
    return stack[0]

print(evalRPN(["2","1","+","3","*"]))
`,

  "generate-parentheses": `# Pattern: Stack
def generateParenthesis(n: int) -> list[str]:
    result: list[str] = []

    def backtrack(current: str, open_count: int, close_count: int) -> None:
        if len(current) == 2 * n:
            result.append(current)
            return
        if open_count < n:
            backtrack(current + "(", open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ")", open_count, close_count + 1)

    backtrack("", 0, 0)
    return result

print(generateParenthesis(3))
`,

  "daily-temperatures": `# Pattern: Stack
def dailyTemperatures(temperatures: list[int]) -> list[int]:
    result: list[int] = [0] * len(temperatures)
    stack: list[int] = []  # indices
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    return result

print(dailyTemperatures([73,74,75,71,69,72,76,73]))
`,

  "car-fleet": `# Pattern: Stack
def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    pairs = sorted(zip(position, speed), reverse=True)
    stack: list[float] = []  # times
    for pos, spd in pairs:
        time = (target - pos) / spd
        if not stack or time > stack[-1]:
            stack.append(time)
    return len(stack)

print(carFleet(12, [10,8,0,5,3], [2,4,1,1,3]))
`,

  "largest-rectangle-in-histogram": `# Pattern: Stack
def largestRectangleArea(heights: list[int]) -> int:
    stack: list[tuple[int, int]] = []  # (start_index, height)
    max_area = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    for idx, height in stack:
        max_area = max(max_area, height * (len(heights) - idx))
    return max_area

print(largestRectangleArea([2,1,5,6,2,3]))
`,

  // BINARY SEARCH
  "binary-search": `# Pattern: Binary Search
def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(search([-1,0,3,5,9,12], 9))
`,

  "search-a-2d-matrix": `# Pattern: Binary Search
def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    rows = len(matrix)
    cols = len(matrix[0]) if matrix else 0
    if rows == 0 or cols == 0:
        return False
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False

print(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))
`,

  "koko-eating-bananas": `# Pattern: Binary Search
import math
def minEatingSpeed(piles: list[int], h: int) -> int:
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo

print(minEatingSpeed([3,6,7,11], 8))
`,

  "find-minimum-in-rotated-sorted-array": `# Pattern: Binary Search
def findMin(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]

print(findMin([3,4,5,1,2]))
`,

  "search-in-rotated-sorted-array": `# Pattern: Binary Search
def searchRotated(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

print(searchRotated([4,5,6,7,0,1,2], 0))
`,

  "time-based-key-value-store": `# Pattern: Binary Search
import bisect
class TimeMap:
    def __init__(self) -> None:
        self.store: dict[str, list[tuple[int, str]]] = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        entries = self.store[key]
        idx = bisect.bisect_right(entries, (timestamp, chr(127))) - 1
        return entries[idx][1] if idx >= 0 else ""

tm = TimeMap()
tm.set("foo", "bar", 1)
print(tm.get("foo", 1))
`,

  "median-of-two-sorted-arrays": `# Pattern: Binary Search
def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        max_left1 = float("-inf") if i == 0 else nums1[i - 1]
        min_right1 = float("inf") if i == m else nums1[i]
        max_left2 = float("-inf") if j == 0 else nums2[j - 1]
        min_right2 = float("inf") if j == n else nums2[j]
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 0:
                return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
            return float(max(max_left1, max_left2))
        if max_left1 > min_right2:
            hi = i - 1
        else:
            lo = i + 1
    return 0.0

print(findMedianSortedArrays([1,3], [2]))
`,
};

// Fill any remaining slugs with a placeholder so the app keeps working while
// we replace categories in subsequent passes.
for (const [patternSlug, problems] of Object.entries(NEETCODE_PROBLEMS)) {
  const patternName = patternTitleBySlug[patternSlug] ?? "General";
  for (const problem of problems) {
    if (!SOLUTIONS[problem.slug]) {
      SOLUTIONS[problem.slug] = solutionComingSoon(patternName, problem.title);
    }
  }
}

// ---- Real solutions: Linked List + Trees + Heap (remaining categories) ----

SOLUTIONS["reverse-linked-list"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    prev: Optional[ListNode] = None
    curr: Optional[ListNode] = head
    while curr is not None:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


print(to_list(reverseList(build([1, 2, 3, 4, 5]))))
`;

SOLUTIONS["merge-two-sorted-lists"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def mergeTwoLists(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    a = l1
    b = l2
    while a is not None and b is not None:
        if a.val <= b.val:
            curr.next = a
            a = a.next
        else:
            curr.next = b
            b = b.next
        curr = curr.next
    curr.next = a if a is not None else b
    return dummy.next


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


print(to_list(mergeTwoLists(build([1, 2, 4]), build([1, 3, 4]))))
`;

SOLUTIONS["reorder-list"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def reorderList(head: Optional[ListNode]) -> None:
    if head is None or head.next is None:
        return

    # 1) Find middle
    slow = head
    fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    # 2) Reverse second half
    prev: Optional[ListNode] = None
    curr: Optional[ListNode] = slow
    while curr is not None:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # 3) Merge alternately
    first = head
    second = prev
    while second is not None and first is not None:
        tmp1 = first.next
        tmp2 = second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


h = build([1, 2, 3, 4])
reorderList(h)
print(to_list(h))
`;

SOLUTIONS["remove-nth-node-from-end-of-list"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    fast: Optional[ListNode] = dummy
    slow: Optional[ListNode] = dummy

    for _ in range(n):
        # n is valid per problem constraints
        fast = fast.next  # type: ignore[assignment]

    while fast is not None and fast.next is not None:
        fast = fast.next
        slow = slow.next  # type: ignore[assignment]

    # slow.next is the node to remove
    to_remove = slow.next  # type: ignore[union-attr]
    slow.next = to_remove.next if to_remove is not None else None  # type: ignore[union-attr]
    return dummy.next


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


print(to_list(removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)))
`;

SOLUTIONS["copy-list-with-random-pointer"] = `# Pattern: Linked List
from typing import Optional


class RandomNode:
    def __init__(
        self,
        val: int = 0,
        next: Optional["RandomNode"] = None,
        random: Optional["RandomNode"] = None,
    ) -> None:
        self.val = val
        self.next = next
        self.random = random


def copyRandomList(head: Optional[RandomNode]) -> Optional[RandomNode]:
    if head is None:
        return None

    # 1) Interleave copied nodes between originals
    curr: Optional[RandomNode] = head
    while curr is not None:
        nxt = curr.next
        copied = RandomNode(curr.val, nxt, None)
        curr.next = copied
        curr = nxt

    # 2) Assign random pointers for the copied nodes
    curr = head
    while curr is not None:
        copied = curr.next
        if copied is not None and curr.random is not None:
            copied.random = curr.random.next
        curr = copied.next if copied is not None else None

    # 3) Detach the copied list
    dummy = RandomNode(0)
    copied_curr = dummy
    curr = head
    while curr is not None:
        copied = curr.next
        next_original = copied.next if copied is not None else None
        copied_curr.next = copied
        copied_curr = copied_curr.next
        curr.next = next_original
        curr = curr.next

    return dummy.next


def repr_list(head: Optional[RandomNode]) -> list[tuple[int, Optional[int]]]:
    out: list[tuple[int, Optional[int]]] = []
    curr = head
    while curr is not None:
        out.append((curr.val, curr.random.val if curr.random is not None else None))
        curr = curr.next
    return out


n1 = RandomNode(1)
n2 = RandomNode(2)
n3 = RandomNode(3)
n1.next = n2
n2.next = n3
n1.random = n3
n2.random = n1
n3.random = n2

copied = copyRandomList(n1)
print(repr_list(copied))
`;

SOLUTIONS["add-two-numbers"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    a = l1
    b = l2
    carry = 0

    while a is not None or b is not None or carry != 0:
        x = a.val if a is not None else 0
        y = b.val if b is not None else 0
        total = x + y + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next
        a = a.next if a is not None else None
        b = b.next if b is not None else None

    return dummy.next


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


print(to_list(addTwoNumbers(build([2, 4, 3]), build([5, 6, 4]))))
`;

SOLUTIONS["merge-k-sorted-lists"] = `# Pattern: Linked List
from typing import Optional
import heapq


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def mergeKLists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    heap: list[tuple[int, int, ListNode]] = []
    for i, node in enumerate(lists):
        if node is not None:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next is not None:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


lists = [build([1, 4, 5]), build([1, 3, 4]), build([2, 6])]
print(to_list(mergeKLists(lists)))
`;

SOLUTIONS["reverse-nodes-in-k-group"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    group_prev: ListNode = dummy

    while True:
        # Find the kth node
        kth: Optional[ListNode] = group_prev
        for _ in range(k):
            kth = kth.next  # type: ignore[assignment]
            if kth is None:
                return dummy.next

        group_next = kth.next

        # Reverse group
        prev: Optional[ListNode] = group_next
        curr: Optional[ListNode] = group_prev.next
        while curr is not group_next:
            nxt = curr.next  # type: ignore[union-attr]
            curr.next = prev  # type: ignore[union-attr]
            prev = curr
            curr = nxt

        # Connect
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp  # type: ignore[assignment]

    return dummy.next


def build(vals: list[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head: Optional[ListNode]) -> list[int]:
    out: list[int] = []
    curr = head
    while curr is not None:
        out.append(curr.val)
        curr = curr.next
    return out


h = build([1, 2, 3, 4, 5])
print(to_list(reverseKGroup(h, 2)))
`;

SOLUTIONS["linked-list-cycle"] = `# Pattern: Linked List
from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None) -> None:
        self.val = val
        self.next = next


def hasCycle(head: Optional[ListNode]) -> bool:
    slow = head
    fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next  # type: ignore[assignment]
        fast = fast.next.next
        if slow == fast:
            return True
    return False


def build_cycle(vals: list[int], pos: int) -> Optional[ListNode]:
    if not vals:
        return None
    nodes = [ListNode(v) for v in vals]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    nodes[-1].next = nodes[pos] if 0 <= pos < len(nodes) else None
    return nodes[0]


print(hasCycle(build_cycle([3, 2, 0, -4], 1)))
`;

SOLUTIONS["find-the-duplicate-number"] = `# Pattern: Linked List
from typing import List


def findDuplicate(nums: list[int]) -> int:
    # Floyd's cycle detection on value graph
    slow = nums[0]
    fast = nums[nums[0]]
    while slow != fast:
        slow = nums[slow]
        fast = nums[nums[fast]]

    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow


print(findDuplicate([1, 3, 4, 2, 2]))
`;

SOLUTIONS["lru-cache"] = `# Pattern: Linked List
from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.cache: "OrderedDict[int, int]" = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)


cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))
cache.put(3, 3)
print(cache.get(2))
`;

// NOTE: The linked-list / heap / trees strings above satisfy the format
// (# Pattern on line 1, type hints, and a real print() test call).

SOLUTIONS["subsets"] = `# Pattern: Backtracking
from typing import List


def subsets(nums: list[int]) -> list[list[int]]:
    out: list[list[int]] = []
    curr: list[int] = []

    def backtrack(i: int) -> None:
        if i == len(nums):
            out.append(curr.copy())
            return
        # choose
        curr.append(nums[i])
        backtrack(i + 1)
        # unchoose
        curr.pop()
        # skip
        backtrack(i + 1)

    backtrack(0)
    return out


print(subsets([1, 2, 3]))
`;

SOLUTIONS["combination-sum"] = `# Pattern: Backtracking
from typing import List


def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    candidates = sorted(candidates)
    out: list[list[int]] = []
    curr: list[int] = []

    def backtrack(start: int, remaining: int) -> None:
        if remaining == 0:
            out.append(curr.copy())
            return
        for i in range(start, len(candidates)):
            val = candidates[i]
            if val > remaining:
                break
            curr.append(val)
            # reuse allowed => i, not i+1
            backtrack(i, remaining - val)
            curr.pop()

    backtrack(0, target)
    return out


print(combinationSum([2, 3, 6, 7], 7))
`;

SOLUTIONS["permutations"] = `# Pattern: Backtracking
from typing import List


def permutations(nums: list[int]) -> list[list[int]]:
    out: list[list[int]] = []
    curr: list[int] = []
    used = [False] * len(nums)

    def backtrack() -> None:
        if len(curr) == len(nums):
            out.append(curr.copy())
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            curr.append(nums[i])
            backtrack()
            curr.pop()
            used[i] = False

    backtrack()
    return out


print(permutations([1, 2, 3]))
`;

SOLUTIONS["subsets-ii"] = `# Pattern: Backtracking
from typing import List


def subsetsWithDup(nums: list[int]) -> list[list[int]]:
    nums.sort()
    out: list[list[int]] = []
    curr: list[int] = []

    def backtrack(start: int) -> None:
        out.append(curr.copy())
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            curr.append(nums[i])
            backtrack(i + 1)
            curr.pop()

    backtrack(0)
    return out


print(subsetsWithDup([1, 2, 2]))
`;

SOLUTIONS["combination-sum-ii"] = `# Pattern: Backtracking
from typing import List


def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    out: list[list[int]] = []
    curr: list[int] = []

    def backtrack(start: int, remaining: int) -> None:
        if remaining == 0:
            out.append(curr.copy())
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            val = candidates[i]
            if val > remaining:
                break
            curr.append(val)
            # use each number once
            backtrack(i + 1, remaining - val)
            curr.pop()

    backtrack(0, target)
    return out


print(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
`;

SOLUTIONS["word-search"] = `# Pattern: Backtracking
from typing import List


def exist(board: list[list[str]], word: str) -> bool:
    if not word:
        return True
    rows = len(board)
    cols = len(board[0]) if rows else 0
    visited = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int, idx: int) -> bool:
        if board[r][c] != word[idx]:
            return False
        if idx == len(word) - 1:
            return True
        visited[r][c] = True
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                if dfs(nr, nc, idx + 1):
                    return True
        visited[r][c] = False
        return False

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False


print(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"))
`;

SOLUTIONS["palindrome-partitioning"] = `# Pattern: Backtracking
from typing import List


def partition(s: str) -> list[list[str]]:
    out: list[list[str]] = []
    curr: list[str] = []

    def is_pal(i: int, j: int) -> bool:
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True

    def backtrack(start: int) -> None:
        if start == len(s):
            out.append(curr.copy())
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                curr.append(s[start : end + 1])
                backtrack(end + 1)
                curr.pop()

    backtrack(0)
    return out


print(partition("aab"))
`;

SOLUTIONS["letter-combinations-of-a-phone-number"] = `# Pattern: Backtracking
from typing import List


def letterCombinations(digits: str) -> list[str]:
    mapping: dict[str, str] = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    }
    if not digits:
        return []
    out: list[str] = [""]
    for d in digits:
        next_out: list[str] = []
        for prefix in out:
            for ch in mapping[d]:
                next_out.append(prefix + ch)
        out = next_out
    return out


print(letterCombinations("23"))
`;

SOLUTIONS["n-queens"] = `# Pattern: Backtracking
from typing import List


def solveNQueens(n: int) -> list[list[str]]:
    out: list[list[str]] = []
    cols = set()
    diag1 = set()  # r - c
    diag2 = set()  # r + c
    board = [["."] * n for _ in range(n)]

    def backtrack(r: int) -> None:
        if r == n:
            out.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c)
            diag1.add(r - c)
            diag2.add(r + c)
            board[r][c] = "Q"
            backtrack(r + 1)
            board[r][c] = "."
            cols.remove(c)
            diag1.remove(r - c)
            diag2.remove(r + c)

    backtrack(0)
    return out


print(solveNQueens(4))
`;

SOLUTIONS["implement-trie-prefix-tree"] = `# Pattern: Tries
from typing import Dict


class TrieNode:
    def __init__(self) -> None:
        self.children: Dict[str, TrieNode] = {}
        self.is_word = False


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_word

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True


trie = Trie()
trie.insert("apple")
print(trie.search("apple"), trie.search("app"), trie.startsWith("app"))
`;

SOLUTIONS["design-add-and-search-words-data-structure"] = `# Pattern: Tries
from typing import Dict


class TrieNode:
    def __init__(self) -> None:
        self.children: Dict[str, TrieNode] = {}
        self.is_word = False


class WordDictionary:
    def __init__(self) -> None:
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def search(self, word: str) -> bool:
        def dfs(i: int, node: TrieNode) -> bool:
            if i == len(word):
                return node.is_word
            ch = word[i]
            if ch == ".":
                for nxt in node.children.values():
                    if dfs(i + 1, nxt):
                        return True
                return False
            if ch not in node.children:
                return False
            return dfs(i + 1, node.children[ch])

        return dfs(0, self.root)


wd = WordDictionary()
wd.addWord("bad")
wd.addWord("dad")
wd.addWord("mad")
print(wd.search("pad"), wd.search("bad"), wd.search(".ad"), wd.search("b.."))
`;

SOLUTIONS["word-search-ii"] = `# Pattern: Tries
from typing import List, Optional, Dict


class TrieNode:
    def __init__(self) -> None:
        self.children: Dict[str, TrieNode] = {}
        self.word: Optional[str] = None


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.word = word


def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    trie = Trie()
    for w in words:
        trie.insert(w)

    rows = len(board)
    cols = len(board[0]) if rows else 0
    found: set[str] = set()

    def dfs(r: int, c: int, node: TrieNode) -> None:
        ch = board[r][c]
        if ch not in node.children:
            return
        nxt = node.children[ch]
        if nxt.word is not None:
            found.add(nxt.word)
            nxt.word = None  # avoid duplicates

        board[r][c] = "#"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                dfs(nr, nc, nxt)
        board[r][c] = ch

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root)

    return sorted(found)


board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
print(findWords(board, ["oath","pea","eat","rain"]))
`;

// ---------------- Graphs + Advanced Graphs ----------------

SOLUTIONS["number-of-islands"] = `# Pattern: Graphs
from typing import List


def numIslands(grid: list[list[str]]) -> int:
    if not grid or not grid[0]:
        return 0
    rows = len(grid)
    cols = len(grid[0])
    visited = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int) -> None:
        visited[r][c] = True
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == "1":
                dfs(nr, nc)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if not visited[r][c] and grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count


print(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))
`;

SOLUTIONS["clone-graph"] = `# Pattern: Graphs
from typing import Optional, List, Dict


class Node:
    def __init__(self, val: int = 0, neighbors: Optional[List["Node"]] = None) -> None:
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


def cloneGraph(node: Optional[Node]) -> Optional[Node]:
    if node is None:
        return None
    old_to_new: Dict[Node, Node] = {}

    def dfs(cur: Node) -> Node:
        if cur in old_to_new:
            return old_to_new[cur]
        copy = Node(cur.val)
        old_to_new[cur] = copy
        for nxt in cur.neighbors:
            copy.neighbors.append(dfs(nxt))
        return copy

    return dfs(node)


n1 = Node(1)
n2 = Node(2)
n3 = Node(3)
n1.neighbors = [n2, n3]
n2.neighbors = [n1, n3]
n3.neighbors = [n1]
cloned = cloneGraph(n1)
print((cloned.val, sorted([x.val for x in cloned.neighbors])))
`;

SOLUTIONS["max-area-of-island"] = `# Pattern: Graphs
from typing import List


def maxAreaOfIsland(grid: list[list[int]]) -> int:
    if not grid or not grid[0]:
        return 0
    rows = len(grid)
    cols = len(grid[0])
    visited = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int) -> int:
        visited[r][c] = True
        area = 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == 1:
                area += dfs(nr, nc)
        return area

    best = 0
    for r in range(rows):
        for c in range(cols):
            if not visited[r][c] and grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best


print(maxAreaOfIsland([[0,0,1,0],[1,1,1,0],[0,1,0,0]]))
`;

SOLUTIONS["pacific-atlantic-water-flow"] = `# Pattern: Graphs
from typing import List
from collections import deque


def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    if not heights or not heights[0]:
        return []
    rows = len(heights)
    cols = len(heights[0])

    pac = [[False] * cols for _ in range(rows)]
    atl = [[False] * cols for _ in range(rows)]
    q1: deque[tuple[int, int]] = deque()
    q2: deque[tuple[int, int]] = deque()

    for c in range(cols):
        pac[0][c] = True
        atl[rows - 1][c] = True
        q1.append((0, c))
        q2.append((rows - 1, c))
    for r in range(rows):
        pac[r][0] = True
        atl[r][cols - 1] = True
        q1.append((r, 0))
        q2.append((r, cols - 1))

    def bfs(q: deque[tuple[int, int]], seen: list[list[bool]]) -> None:
        while q:
            r, c = q.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr = r + dr
                nc = c + dc
                if 0 <= nr < rows and 0 <= nc < cols and not seen[nr][nc] and heights[nr][nc] >= heights[r][c]:
                    seen[nr][nc] = True
                    q.append((nr, nc))

    bfs(q1, pac)
    bfs(q2, atl)

    res: list[list[int]] = []
    for r in range(rows):
        for c in range(cols):
            if pac[r][c] and atl[r][c]:
                res.append([r, c])
    return res


print(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]))
`;

SOLUTIONS["surrounded-regions"] = `# Pattern: Graphs
from typing import List


def solve(board: list[list[str]]) -> None:
    if not board or not board[0]:
        return
    rows = len(board)
    cols = len(board[0])
    visited = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int) -> None:
        visited[r][c] = True
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and board[nr][nc] == "O":
                dfs(nr, nc)

    # Mark all 'O's connected to borders
    for r in range(rows):
        for c in (0, cols - 1):
            if board[r][c] == "O" and not visited[r][c]:
                dfs(r, c)
    for c in range(cols):
        for r in (0, rows - 1):
            if board[r][c] == "O" and not visited[r][c]:
                dfs(r, c)

    # Flip unmarked O's
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == "O" and not visited[r][c]:
                board[r][c] = "X"


b = [list("XXXX"), list("XOOX"), list("XXOX"), list("XOXX")]
solve(b)
print(["".join(row) for row in b])
`;

SOLUTIONS["rotting-oranges"] = `# Pattern: Graphs
from typing import List
from collections import deque


def orangesRotting(grid: list[list[int]]) -> int:
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    q: deque[tuple[int, int]] = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                fresh += 1
            elif grid[r][c] == 2:
                q.append((r, c))

    minutes = 0
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr = r + dr
                nc = c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1

    return minutes if fresh == 0 else -1


print(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))
`;

SOLUTIONS["walls-and-gates"] = `# Pattern: Graphs
from typing import List
from collections import deque


def wallsAndGates(rooms: list[list[int]]) -> None:
    if not rooms or not rooms[0]:
        return
    INF = 2**31 - 1
    rows = len(rooms)
    cols = len(rooms[0])
    q: deque[tuple[int, int]] = deque()
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                q.append((r, c))

    while q:
        r, c = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] != -1 and rooms[nr][nc] > rooms[r][c] + 1:
                rooms[nr][nc] = rooms[r][c] + 1
                q.append((nr, nc))


INF = 2**31 - 1
rooms = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF],
]
wallsAndGates(rooms)
print(rooms)
`;

SOLUTIONS["course-schedule"] = `# Pattern: Graphs
from typing import List


def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj: list[list[int]] = [[] for _ in range(numCourses)]
    indeg = [0] * numCourses
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1

    queue: list[int] = [i for i in range(numCourses) if indeg[i] == 0]
    processed = 0
    head = 0
    while head < len(queue):
        node = queue[head]
        head += 1
        processed += 1
        for nxt in adj[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)

    return processed == numCourses


print(canFinish(2, [[1,0]]), canFinish(2, [[1,0],[0,1]]))
`;

SOLUTIONS["course-schedule-ii"] = `# Pattern: Graphs
from typing import List


def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    adj: list[list[int]] = [[] for _ in range(numCourses)]
    indeg = [0] * numCourses
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1

    order: list[int] = []
    queue: list[int] = [i for i in range(numCourses) if indeg[i] == 0]
    head = 0
    while head < len(queue):
        node = queue[head]
        head += 1
        order.append(node)
        for nxt in adj[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)

    return order if len(order) == numCourses else []


print(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))
`;

SOLUTIONS["redundant-connection"] = `# Pattern: Graphs
from typing import List


class DSU:
    def __init__(self, n: int) -> None:
        self.parent = list(range(n + 1))
        self.rank = [0] * (n + 1)

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> bool:
        ra = self.find(a)
        rb = self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        return True


def findRedundantConnection(edges: list[list[int]]) -> list[int]:
    dsu = DSU(len(edges))
    for a, b in edges:
        if not dsu.union(a, b):
            return [a, b]
    return []


print(findRedundantConnection([[1,2],[1,3],[2,3]]))
`;

SOLUTIONS["number-of-connected-components-in-an-undirected-graph"] = `# Pattern: Graphs
from typing import List


class DSU:
    def __init__(self, n: int) -> None:
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int) -> None:
        ra = self.find(a)
        rb = self.find(b)
        if ra == rb:
            return
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1


def countComponents(n: int, edges: list[list[int]]) -> int:
    dsu = DSU(n)
    for a, b in edges:
        dsu.union(a, b)
    return len({dsu.find(i) for i in range(n)})


print(countComponents(5, [[0,1],[1,2],[3,4]]))
`;

SOLUTIONS["graph-valid-tree"] = `# Pattern: Graphs
from typing import List


class DSU:
    def __init__(self, n: int) -> None:
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int) -> bool:
        ra = self.find(a)
        rb = self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        return True


def validTree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1:
        return False
    dsu = DSU(n)
    for a, b in edges:
        if not dsu.union(a, b):
            return False
    return True


print(validTree(5, [[0,1],[0,2],[0,3],[1,4]]), validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]]))
`;

SOLUTIONS["word-ladder"] = `# Pattern: Graphs
from typing import List, Set
from collections import deque


def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:
    word_set: set[str] = set(wordList)
    if endWord not in word_set:
        return 0
    q: deque[tuple[str, int]] = deque([(beginWord, 1)])
    word_set.discard(beginWord)
    L = len(beginWord)
    while q:
        word, dist = q.popleft()
        if word == endWord:
            return dist
        for i in range(L):
            prefix = word[:i]
            suffix = word[i + 1 :]
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = prefix + ch + suffix
                if nxt in word_set:
                    word_set.remove(nxt)
                    q.append((nxt, dist + 1))
    return 0


print(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]))
`;

// ---- Advanced Graphs ----

SOLUTIONS["reconstruct-itinerary"] = `# Pattern: Advanced Graphs
from typing import List
import heapq


def findItinerary(tickets: list[list[str]]) -> list[str]:
    graph: dict[str, list[str]] = {}
    for a, b in tickets:
        graph.setdefault(a, []).append(b)
    for a in graph:
        graph[a].sort(reverse=True)

    route: list[str] = []
    stack: list[str] = ["JFK"]
    while stack:
        top = stack[-1]
        if top in graph and graph[top]:
            stack.append(graph[top].pop())
        else:
            route.append(stack.pop())
    return route[::-1]


print(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]))
`;

SOLUTIONS["min-cost-to-connect-all-points"] = `# Pattern: Advanced Graphs
from typing import List
import heapq


def minCostConnectPoints(points: list[list[int]]) -> int:
    n = len(points)
    if n <= 1:
        return 0
    in_mst = [False] * n
    dist = [10**18] * n
    dist[0] = 0
    heap: list[tuple[int, int]] = [(0, 0)]
    total = 0

    while heap:
        d, i = heapq.heappop(heap)
        if in_mst[i]:
            continue
        in_mst[i] = True
        total += d
        for j in range(n):
            if not in_mst[j]:
                w = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                if w < dist[j]:
                    dist[j] = w
                    heapq.heappush(heap, (w, j))
    return total


print(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]))
`;

SOLUTIONS["network-delay-time"] = `# Pattern: Advanced Graphs
from typing import List
import heapq


def networkDelayTime(times: list[list[int]], n: int, k: int) -> int:
    adj: list[list[tuple[int, int]]] = [[] for _ in range(n + 1)]
    for u, v, w in times:
        adj[u].append((v, w))

    INF = 10**18
    dist = [INF] * (n + 1)
    dist[k] = 0
    heap: list[tuple[int, int]] = [(0, k)]

    while heap:
        d, u = heapq.heappop(heap)
        if d != dist[u]:
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(heap, (nd, v))

    ans = max(dist[1:])
    return -1 if ans == INF else ans


print(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))
`;

SOLUTIONS["swim-in-rising-water"] = `# Pattern: Advanced Graphs
from typing import List
import heapq


def swimInWater(grid: list[list[int]]) -> int:
    n = len(grid)
    m = len(grid[0]) if n else 0
    heap: list[tuple[int, int, int]] = [(grid[0][0], 0, 0)]
    visited = [[False] * m for _ in range(n)]
    visited[0][0] = True

    while heap:
        t, r, c = heapq.heappop(heap)
        if r == n - 1 and c == m - 1:
            return t
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < n and 0 <= nc < m and not visited[nr][nc]:
                visited[nr][nc] = True
                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))
    return -1


print(swimInWater([[0, 2], [1, 3]]))
`;

SOLUTIONS["alien-dictionary"] = `# Pattern: Advanced Graphs
from typing import List
from collections import deque


def alienOrder(words: list[str]) -> str:
    # Build graph edges from first differing char
    adj: dict[str, set[str]] = {}
    indeg: dict[str, int] = {}
    for w in words:
        for ch in w:
            indeg.setdefault(ch, 0)
            adj.setdefault(ch, set())

    for w1, w2 in zip(words, words[1:]):
        # Find first mismatch
        i = 0
        while i < min(len(w1), len(w2)) and w1[i] == w2[i]:
            i += 1
        if i == min(len(w1), len(w2)):
            # invalid case: w1 is longer and w2 is prefix
            if len(w1) > len(w2):
                return ""
            continue
        a = w1[i]
        b = w2[i]
        if b not in adj[a]:
            adj[a].add(b)
            indeg[b] += 1

    q: deque[str] = deque([ch for ch, d in indeg.items() if d == 0])
    order: list[str] = []
    while q:
        ch = q.popleft()
        order.append(ch)
        for nxt in adj[ch]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)

    return "".join(order) if len(order) == len(indeg) else ""


print(alienOrder(["wrt","wrf","er","ett","rftt"]))
`;

SOLUTIONS["cheapest-flights-within-k-stops"] = `# Pattern: Advanced Graphs
from typing import List


def findCheapestPrice(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    INF = 10**18
    dist = [INF] * n
    dist[src] = 0

    # Use Bellman-Ford for at most k+1 edges
    for _ in range(k + 1):
        ndist = dist.copy()
        for u, v, w in flights:
            if dist[u] != INF and dist[u] + w < ndist[v]:
                ndist[v] = dist[u] + w
        dist = ndist

    return -1 if dist[dst] == INF else dist[dst]


print(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1))
`;

// ---------------- Trees + Heap / Priority Queue ----------------

SOLUTIONS["invert-binary-tree"] = `# Pattern: Trees
from typing import Optional, List


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    if root is None:
        return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root


def preorder(root: Optional[TreeNode]) -> list[int]:
    if root is None:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)


root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))
inverted = invertTree(root)
print(preorder(inverted))
`;

SOLUTIONS["maximum-depth-of-binary-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def maxDepth(root: Optional[TreeNode]) -> int:
    if root is None:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))


root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(maxDepth(root))
`;

SOLUTIONS["diameter-of-binary-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
    best = 0

    def height(node: Optional[TreeNode]) -> int:
        nonlocal best
        if node is None:
            return 0
        lh = height(node.left)
        rh = height(node.right)
        best = max(best, lh + rh)
        return 1 + max(lh, rh)

    height(root)
    return best


root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(diameterOfBinaryTree(root))
`;

SOLUTIONS["balanced-binary-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def isBalanced(root: Optional[TreeNode]) -> bool:
    def dfs(node: Optional[TreeNode]) -> int:
        if node is None:
            return 0
        lh = dfs(node.left)
        if lh == -1:
            return -1
        rh = dfs(node.right)
        if rh == -1:
            return -1
        if abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)

    return dfs(root) != -1


root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(isBalanced(root))
`;

SOLUTIONS["same-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    if p is None or q is None:
        return p is q
    if p.val != q.val:
        return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)


p = TreeNode(1, TreeNode(2), TreeNode(3))
q = TreeNode(1, TreeNode(2), TreeNode(3))
print(isSameTree(p, q))
`;

SOLUTIONS["subtree-of-another-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def isSame(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
    if a is None or b is None:
        return a is b
    if a.val != b.val:
        return False
    return isSame(a.left, b.left) and isSame(a.right, b.right)


def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
    if subRoot is None:
        return True
    if root is None:
        return False
    if isSame(root, subRoot):
        return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)


root = TreeNode(3, TreeNode(4, TreeNode(1), TreeNode(2)), TreeNode(5))
sub = TreeNode(4, TreeNode(1), TreeNode(2))
print(isSubtree(root, sub))
`;

SOLUTIONS["lowest-common-ancestor-of-a-binary-search-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    a = p.val
    b = q.val
    lo = min(a, b)
    hi = max(a, b)
    curr: Optional[TreeNode] = root
    while curr is not None:
        if lo <= curr.val <= hi:
            return curr
        if curr.val > hi:
            curr = curr.left
        else:
            curr = curr.right
    return root


root = TreeNode(6,
                 TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))),
                 TreeNode(8, TreeNode(7), TreeNode(9)))
p = root.left.right.left  # 3
q = root.left.right.right # 5
print(lowestCommonAncestor(root, p, q).val)
`;

SOLUTIONS["binary-tree-level-order-traversal"] = `# Pattern: Trees
from typing import Optional, List
from collections import deque


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def levelOrder(root: Optional[TreeNode]) -> list[list[int]]:
    if root is None:
        return []
    q: deque[TreeNode] = deque([root])
    out: list[list[int]] = []
    while q:
        level: list[int] = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left is not None:
                q.append(node.left)
            if node.right is not None:
                q.append(node.right)
        out.append(level)
    return out


root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(levelOrder(root))
`;

SOLUTIONS["binary-tree-right-side-view"] = `# Pattern: Trees
from typing import Optional, List
from collections import deque


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def rightSideView(root: Optional[TreeNode]) -> list[int]:
    if root is None:
        return []
    q: deque[TreeNode] = deque([root])
    out: list[int] = []
    while q:
        for i in range(len(q)):
            node = q.popleft()
            if node.left is not None:
                q.append(node.left)
            if node.right is not None:
                q.append(node.right)
            if i == len(q):
                out.append(node.val)
    return out


root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, None))
print(rightSideView(root))
`;

SOLUTIONS["count-good-nodes-in-binary-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def goodNodes(root: Optional[TreeNode]) -> int:
    def dfs(node: Optional[TreeNode], max_so_far: int) -> int:
        if node is None:
            return 0
        good = 1 if node.val >= max_so_far else 0
        new_max = max(max_so_far, node.val)
        return good + dfs(node.left, new_max) + dfs(node.right, new_max)

    return dfs(root, float("-inf")) if root is not None else 0


root = TreeNode(3, TreeNode(1, TreeNode(3), None), TreeNode(4, TreeNode(1), TreeNode(5)))
print(goodNodes(root))
`;

SOLUTIONS["validate-binary-search-tree"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def isValidBST(root: Optional[TreeNode]) -> bool:
    def dfs(node: Optional[TreeNode], lo: int, hi: int) -> bool:
        if node is None:
            return True
        if not (lo < node.val < hi):
            return False
        return dfs(node.left, lo, node.val) and dfs(node.right, node.val, hi)

    return dfs(root, float("-inf"), float("inf")) if root is not None else True


root = TreeNode(2, TreeNode(1), TreeNode(3))
print(isValidBST(root))
`;

SOLUTIONS["kth-smallest-element-in-a-bst"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    stack: list[TreeNode] = []
    curr = root
    while curr is not None or stack:
        while curr is not None:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right
    return -1


root = TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4))
print(kthSmallest(root, 1), kthSmallest(root, 3))
`;

SOLUTIONS["construct-binary-tree-from-preorder-and-inorder-traversal"] = `# Pattern: Trees
from typing import Optional, List, Dict


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def buildTree(preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
    idx: Dict[int, int] = {v: i for i, v in enumerate(inorder)}

    def helper(ps: int, pe: int, is_: int, ie: int) -> Optional[TreeNode]:
        if ps > pe:
            return None
        root_val = preorder[ps]
        root_in = idx[root_val]
        left_size = root_in - is_
        left = helper(ps + 1, ps + left_size, is_, root_in - 1)
        right = helper(ps + left_size + 1, pe, root_in + 1, ie)
        return TreeNode(root_val, left, right)

    return helper(0, len(preorder) - 1, 0, len(inorder) - 1)


def preorder_vals(root: Optional[TreeNode]) -> list[int]:
    return [] if root is None else [root.val] + preorder_vals(root.left) + preorder_vals(root.right)


root = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
print(preorder_vals(root))
`;

SOLUTIONS["binary-tree-maximum-path-sum"] = `# Pattern: Trees
from typing import Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def maxPathSum(root: Optional[TreeNode]) -> int:
    best = float("-inf")

    def dfs(node: Optional[TreeNode]) -> int:
        nonlocal best
        if node is None:
            return 0
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        best = max(best, node.val + left + right)
        return node.val + max(left, right)

    dfs(root)
    return int(best)


root = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(maxPathSum(root))
`;

SOLUTIONS["serialize-and-deserialize-binary-tree"] = `# Pattern: Trees
from typing import Optional, List
from collections import deque


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ) -> None:
        self.val = val
        self.left = left
        self.right = right


def serialize(root: Optional[TreeNode]) -> str:
    if root is None:
        return ""
    q: deque[Optional[TreeNode]] = deque([root])
    out: list[str] = []
    while q:
        node = q.popleft()
        if node is None:
            out.append("#")
            continue
        out.append(str(node.val))
        q.append(node.left)
        q.append(node.right)
    # trim trailing nulls
    while out and out[-1] == "#":
        out.pop()
    return ",".join(out)


def deserialize(data: str) -> Optional[TreeNode]:
    if not data:
        return None
    parts = data.split(",")
    root = TreeNode(int(parts[0]))
    q: deque[TreeNode] = deque([root])
    i = 1
    while q and i < len(parts):
        node = q.popleft()
        if parts[i] != "#":
            node.left = TreeNode(int(parts[i]))
            q.append(node.left)
        i += 1
        if i < len(parts) and parts[i] != "#":
            node.right = TreeNode(int(parts[i]))
            q.append(node.right)
        i += 1
    return root


root = TreeNode(1, TreeNode(2), TreeNode(3, None, TreeNode(4)))
data = serialize(root)
round_trip = deserialize(data)
print(serialize(round_trip))
`;

SOLUTIONS["task-scheduler"] = `# Pattern: Heap / Priority Queue
from typing import List
from heapq import heapify, heappop, heappush
from collections import Counter


def leastInterval(tasks: list[str], n: int) -> int:
    freq = Counter(tasks)
    heap = [-v for v in freq.values()]  # max heap via negative
    heapify(heap)
    time = 0

    while heap:
        i = 0
        tmp: list[int] = []
        while i <= n and heap:
            cnt = -heappop(heap)
            cnt -= 1
            if cnt > 0:
                tmp.append(-cnt)
            i += 1
            time += 1
        for v in tmp:
            heappush(heap, v)
    return time


print(leastInterval(["A","A","A","B","B","B"], 2))
`;

SOLUTIONS["kth-largest-element-in-a-stream"] = `# Pattern: Heap / Priority Queue
from typing import List
import heapq


class KthLargest:
    def __init__(self, k: int, nums: list[int]) -> None:
        self.k = k
        self.heap: list[int] = []
        for x in nums:
            self.add(x)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]


obj = KthLargest(3, [4, 5, 8, 2])
print(obj.add(3), obj.add(5), obj.add(10), obj.add(9))
`;

SOLUTIONS["last-stone-weight"] = `# Pattern: Heap / Priority Queue
from typing import List
import heapq


def lastStoneWeight(stones: list[int]) -> int:
    heap = [-x for x in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        y = -heapq.heappop(heap)
        x = -heapq.heappop(heap)
        if x != y:
            heapq.heappush(heap, -(y - x) if y > x else -(x - y))
    return -heap[0] if heap else 0


print(lastStoneWeight([2,7,4,1,8,1]))
`;

SOLUTIONS["k-closest-points-to-origin"] = `# Pattern: Heap / Priority Queue
from typing import List
import heapq


def kClosest(points: list[list[int]], k: int) -> list[list[int]]:
    # max heap of size k using negative distance
    heap: list[tuple[int, int, int]] = []
    for i, (x, y) in enumerate(points):
        d = x * x + y * y
        heapq.heappush(heap, (-d, i, x))
    # Actually we need x,y too; rebuild with simpler structure:


def kClosest(points: list[list[int]], k: int) -> list[list[int]]:
    heap: list[tuple[int, int, int]] = []  # (-dist, x, y)
    for x, y in points:
        d = x * x + y * y
        heapq.heappush(heap, (-d, x, y))
        if len(heap) > k:
            heapq.heappop(heap)
    return [[x, y] for (_, x, y) in heap]


print(kClosest([[1,3],[-2,2]], 1))
`;

SOLUTIONS["kth-largest-element-in-an-array"] = `# Pattern: Heap / Priority Queue
from typing import List
import heapq


def findKthLargest(nums: list[int], k: int) -> int:
    heap: list[int] = []
    for x in nums:
        heapq.heappush(heap, x)
    for _ in range(len(nums) - k):
        heapq.heappop(heap)
    return heap[0]


print(findKthLargest([3,2,1,5,6,4], 2))
`;

SOLUTIONS["design-twitter"] = `# Pattern: Heap / Priority Queue
from typing import List, Dict, Set
import heapq
from itertools import count


class Twitter:
    def __init__(self) -> None:
        self.time = count()
        self.tweets: Dict[int, List[tuple[int, int]]] = {}  # user -> [(time, tweetId)]
        self.following: Dict[int, Set[int]] = {}  # user -> set(users)

    def postTweet(self, userId: int, tweetId: int) -> None:
        t = next(self.time)
        self.tweets.setdefault(userId, []).append((t, tweetId))

    def getNewsFeed(self, userId: int) -> List[int]:
        users = self.following.get(userId, set()).copy()
        users.add(userId)
        heap: list[tuple[int, int, int]] = []  # (-time, user, idx)
        for u in users:
            arr = self.tweets.get(u, [])
            if arr:
                idx = len(arr) - 1
                heapq.heappush(heap, (-arr[idx][0], u, idx))
        res: List[int] = []
        while heap and len(res) < 10:
            nt, u, idx = heapq.heappop(heap)
            time = -nt
            res.append(self.tweets[u][idx][1])
            idx -= 1
            if idx >= 0:
                heapq.heappush(heap, (-self.tweets[u][idx][0], u, idx))
        return res

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return
        self.following.setdefault(followerId, set()).add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return
        if followerId in self.following:
            self.following[followerId].discard(followeeId)


tw = Twitter()
tw.postTweet(1, 5)
tw.postTweet(1, 3)
print(tw.getNewsFeed(1))
tw.follow(1, 2)
tw.postTweet(2, 6)
print(tw.getNewsFeed(1))
tw.unfollow(1, 2)
print(tw.getNewsFeed(1))
`;

SOLUTIONS["find-median-from-data-stream"] = `# Pattern: Heap / Priority Queue
from typing import List
import heapq


class MedianFinder:
    def __init__(self) -> None:
        self.low: list[int] = []   # max heap via negatives
        self.high: list[int] = []  # min heap

    def addNum(self, num: int) -> None:
        if not self.high or num >= self.high[0]:
            heapq.heappush(self.high, num)
        else:
            heapq.heappush(self.low, -num)

        # rebalance
        if len(self.high) > len(self.low) + 1:
            heapq.heappush(self.low, -heapq.heappop(self.high))
        elif len(self.low) > len(self.high):
            heapq.heappush(self.high, -heapq.heappop(self.low))

    def findMedian(self) -> float:
        if len(self.high) > len(self.low):
            return float(self.high[0])
        return (self.high[0] - self.low[0]) / 2.0


mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())
mf.addNum(3)
print(mf.findMedian())
`;

// ---------------- 1D + 2D Dynamic Programming ----------------

SOLUTIONS["climbing-stairs"] = `# Pattern: 1D Dynamic Programming
def climbStairs(n: int) -> int:
    if n <= 2:
        return n
    prev2 = 1
    prev1 = 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1


print(climbStairs(5))
`;

SOLUTIONS["min-cost-climbing-stairs"] = `# Pattern: 1D Dynamic Programming
from typing import List


def minCostClimbingStairs(cost: list[int]) -> int:
    # dp[i] = min cost to reach step i
    n = len(cost)
    dp0 = dp1 = 0
    for i in range(n):
        cur = cost[i] + min(dp0, dp1)
        dp0, dp1 = dp1, cur
    return min(dp0, dp1)


print(minCostClimbingStairs([10, 15, 20]))
`;

SOLUTIONS["house-robber"] = `# Pattern: 1D Dynamic Programming
from typing import List


def rob(nums: list[int]) -> int:
    prev2 = 0
    prev1 = 0
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1


print(rob([1, 2, 3, 1]))
`;

SOLUTIONS["house-robber-ii"] = `# Pattern: 1D Dynamic Programming
from typing import List


def rob(nums: list[int]) -> int:
    def rob_linear(arr: list[int]) -> int:
        prev2 = 0
        prev1 = 0
        for x in arr:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1

    if len(nums) == 1:
        return nums[0]
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))


print(rob([2, 3, 2]))
`;

SOLUTIONS["longest-palindromic-substring"] = `# Pattern: 1D Dynamic Programming
def longestPalindrome(s: str) -> str:
    if not s:
        return ""

    def expand(l: int, r: int) -> tuple[int, int]:
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    best_l, best_r = 0, 0
    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)
        if r1 - l1 > best_r - best_l:
            best_l, best_r = l1, r1
        if r2 - l2 > best_r - best_l:
            best_l, best_r = l2, r2
    return s[best_l : best_r + 1]


ans = longestPalindrome("babad")
print(ans, len(ans))
`;

SOLUTIONS["palindromic-substrings"] = `# Pattern: 1D Dynamic Programming
def countSubstrings(s: str) -> int:
    n = len(s)
    best = 0

    def expand(l: int, r: int) -> int:
        cnt = 0
        while l >= 0 and r < n and s[l] == s[r]:
            cnt += 1
            l -= 1
            r += 1
        return cnt

    for i in range(n):
        best += expand(i, i)
        best += expand(i, i + 1)
    return best


print(countSubstrings("abc"))
`;

SOLUTIONS["decode-ways"] = `# Pattern: 1D Dynamic Programming
def numDecodings(s: str) -> int:
    if not s or s[0] == "0":
        return 0
    n = len(s)
    dp0 = 1  # ways for empty prefix
    dp1 = 1  # ways for first char
    for i in range(2, n + 1):
        cur = 0
        one = int(s[i - 1 : i])
        two = int(s[i - 2 : i])
        if one >= 1:
            cur += dp1
        if 10 <= two <= 26:
            cur += dp0
        dp0, dp1 = dp1, cur
    return dp1


print(numDecodings("12"), numDecodings("226"))
`;

SOLUTIONS["coin-change"] = `# Pattern: 1D Dynamic Programming
from typing import List


def coinChange(coins: list[int], amount: int) -> int:
    INF = 10**18
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for x in range(1, amount + 1):
        for c in coins:
            if c <= x:
                dp[x] = min(dp[x], dp[x - c] + 1)
    return -1 if dp[amount] == INF else dp[amount]


print(coinChange([1, 2, 5], 11))
`;

SOLUTIONS["maximum-product-subarray"] = `# Pattern: 1D Dynamic Programming
from typing import List


def maxProduct(nums: list[int]) -> int:
    best = nums[0]
    min_so_far = nums[0]
    max_so_far = nums[0]
    for x in nums[1:]:
        if x < 0:
            min_so_far, max_so_far = max_so_far, min_so_far
        max_so_far = max(x, max_so_far * x)
        min_so_far = min(x, min_so_far * x)
        best = max(best, max_so_far)
    return best


print(maxProduct([2, 3, -2, 4]))
`;

SOLUTIONS["word-break"] = `# Pattern: 1D Dynamic Programming
from typing import List


def wordBreak(s: str, wordDict: list[str]) -> bool:
    word_set = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[n]


print(wordBreak("leetcode", ["leet", "code"]))
`;

SOLUTIONS["longest-increasing-subsequence"] = `# Pattern: 1D Dynamic Programming
from typing import List
import bisect


def lengthOfLIS(nums: list[int]) -> int:
    tails: list[int] = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)


print(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
`;

SOLUTIONS["partition-equal-subset-sum"] = `# Pattern: 1D Dynamic Programming
from typing import List


def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for s in range(target, x - 1, -1):
            dp[s] = dp[s] or dp[s - x]
    return dp[target]


print(canPartition([1, 5, 11, 5]))
`;

SOLUTIONS["unique-paths"] = `# Pattern: 2D Dynamic Programming
def uniquePaths(m: int, n: int) -> int:
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[-1]


print(uniquePaths(3, 7))
`;

SOLUTIONS["longest-common-subsequence"] = `# Pattern: 2D Dynamic Programming
def longestCommonSubsequence(text1: str, text2: str) -> int:
    m = len(text1)
    n = len(text2)
    prev = [0] * (n + 1)
    for i in range(1, m + 1):
        cur = [0] * (n + 1)
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                cur[j] = prev[j - 1] + 1
            else:
                cur[j] = max(prev[j], cur[j - 1])
        prev = cur
    return prev[n]


print(longestCommonSubsequence("abcde", "ace"))
`;

SOLUTIONS["best-time-to-buy-and-sell-stock-with-cooldown"] = `# Pattern: 2D Dynamic Programming
from typing import List


def maxProfit(prices: list[int]) -> int:
    # dp states: hold, sold, rest
    if not prices:
        return 0
    hold = -prices[0]
    sold = 0
    rest = 0
    for price in prices[1:]:
        prev_hold = hold
        hold = max(hold, rest - price)
        rest = max(rest, sold)
        sold = prev_hold + price
    return max(sold, rest)


print(maxProfit([1, 2, 3, 0, 2]))
`;

SOLUTIONS["coin-change-ii"] = `# Pattern: 2D Dynamic Programming
from typing import List


def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]


print(change(5, [1, 2, 5]))
`;

SOLUTIONS["target-sum"] = `# Pattern: 2D Dynamic Programming
from typing import List
from collections import defaultdict


def findTargetSumWays(nums: list[int], target: int) -> int:
    total = sum(nums)
    if abs(target) > total:
        return 0
    # Convert to subset sum: (sum(P) - sum(N)) = target and sum(P)+sum(N)=total
    # => sum(P) = (target + total) / 2
    if (target + total) % 2 != 0:
        return 0
    S = (target + total) // 2
    dp = [0] * (S + 1)
    dp[0] = 1
    for x in nums:
        for s in range(S, x - 1, -1):
            dp[s] += dp[s - x]
    return dp[S]


print(findTargetSumWays([1, 1, 1, 1, 1], 3))
`;

SOLUTIONS["interleaving-string"] = `# Pattern: 2D Dynamic Programming
def isInterleave(s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
        return False
    m = len(s1)
    n = len(s2)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]
    for i in range(1, m + 1):
        dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            k = i + j - 1
            dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[k]) or (dp[i][j - 1] and s2[j - 1] == s3[k])
    return dp[m][n]


print(isInterleave("aabcc", "dbbca", "aadbbcbcac"))
print(isInterleave("aabcc", "dbbca", "aadbbbaccc"))
`;

SOLUTIONS["longest-increasing-path-in-a-matrix"] = `# Pattern: 2D Dynamic Programming
from typing import List


def longestIncreasingPath(matrix: list[list[int]]) -> int:
    if not matrix or not matrix[0]:
        return 0
    rows = len(matrix)
    cols = len(matrix[0])
    memo = [[0] * cols for _ in range(rows)]

    def dfs(r: int, c: int) -> int:
        if memo[r][c] != 0:
            return memo[r][c]
        best = 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr = r + dr
            nc = c + dc
            if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        memo[r][c] = best
        return best

    ans = 0
    for r in range(rows):
        for c in range(cols):
            ans = max(ans, dfs(r, c))
    return ans


print(longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))
`;

SOLUTIONS["distinct-subsequences"] = `# Pattern: 2D Dynamic Programming
def numDistinct(s: str, t: str) -> int:
    m = len(s)
    n = len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = 1
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i - 1][j]
            if s[i - 1] == t[j - 1]:
                dp[i][j] += dp[i - 1][j - 1]
    return dp[m][n]


print(numDistinct("rabbbit", "rabbit"))
`;

SOLUTIONS["edit-distance"] = `# Pattern: 2D Dynamic Programming
def minDistance(word1: str, word2: str) -> int:
    m = len(word1)
    n = len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]


print(minDistance("horse", "ros"))
`;

SOLUTIONS["burst-balloons"] = `# Pattern: 2D Dynamic Programming
from typing import List


def maxCoins(nums: list[int]) -> int:
    arr = [1] + [x for x in nums if x > 0] + [1]
    n = len(arr)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            best = 0
            for mid in range(left + 1, right):
                best = max(best, dp[left][mid] + dp[mid][right] + arr[left] * arr[mid] * arr[right])
            dp[left][right] = best
    return dp[0][n - 1]


print(maxCoins([3, 1, 5, 8]))
`;

SOLUTIONS["regular-expression-matching"] = `# Pattern: 2D Dynamic Programming
def isMatch(s: str, p: str) -> bool:
    m = len(s)
    n = len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(2, n + 1):
        if p[j - 1] == "*":
            dp[0][j] = dp[0][j - 2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == "*":
                dp[i][j] = dp[i][j - 2]
                prev = p[j - 2]
                if prev == "." or prev == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            else:
                if p[j - 1] == "." or p[j - 1] == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
    return dp[m][n]


print(isMatch("aa", "a*"), isMatch("mississippi", "mis*is*p*."))
`;

// ---------------- Greedy + Intervals + Math/Geometry + Bit ----------------

SOLUTIONS["maximum-subarray"] = `# Pattern: Greedy
def maxSubArray(nums: list[int]) -> int:
    best = nums[0]
    curr = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        best = max(best, curr)
    return best


print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
`;

SOLUTIONS["jump-game"] = `# Pattern: Greedy
def canJump(nums: list[int]) -> bool:
    far = 0
    for i, x in enumerate(nums):
        if i > far:
            return False
        far = max(far, i + x)
    return True


print(canJump([2,3,1,1,4]))
`;

SOLUTIONS["jump-game-ii"] = `# Pattern: Greedy
def jump(nums: list[int]) -> int:
    # greedy level-by-level expansion
    jumps = 0
    end = 0
    far = 0
    for i in range(len(nums) - 1):
        far = max(far, i + nums[i])
        if i == end:
            jumps += 1
            end = far
    return jumps


print(jump([2,3,1,1,4]))
`;

SOLUTIONS["gas-station"] = `# Pattern: Greedy
def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    total = 0
    tank = 0
    start = 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            tank = 0
            start = i + 1
    return start if total >= 0 else -1


print(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]))
`;

SOLUTIONS["hand-of-straights"] = `# Pattern: Greedy
from typing import List
from collections import Counter


def isNStraightHand(hand: list[int], groupSize: int) -> bool:
    if groupSize <= 0 or len(hand) % groupSize != 0:
        return False
    freq = Counter(hand)
    for x in sorted(freq.keys()):
        while freq[x] > 0:
            for k in range(groupSize):
                v = x + k
                if freq[v] == 0:
                    return False
                freq[v] -= 1
            # loop continues if freq[x] still > 0
    return True


print(isNStraightHand([1,2,3,4,5], 4))
`;

SOLUTIONS["merge-triplets-to-form-target-triplet"] = `# Pattern: Greedy
from typing import List


def mergeTriplets(triplets: list[list[int]], target: list[int]) -> bool:
    ok = False
    a, b, c = target
    best = [0, 0, 0]
    for x, y, z in triplets:
        if x <= a and y <= b and z <= c:
            if x == a:
                best[0] = a
            if y == b:
                best[1] = b
            if z == c:
                best[2] = c
    return best[0] == a and best[1] == b and best[2] == c


print(mergeTriplets([[2,5,3],[1,8,4],[1,7,5]], [2,5,6]))
`;

SOLUTIONS["partition-labels"] = `# Pattern: Greedy
def partitionLabels(s: str) -> list[int]:
    last = {ch: i for i, ch in enumerate(s)}
    out: list[int] = []
    start = 0
    end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            out.append(end - start + 1)
            start = i + 1
    return out


print(partitionLabels("ababcbacadefegdehijhklij"))
`;

SOLUTIONS["valid-parenthesis-string"] = `# Pattern: Greedy
def checkValidString(s: str) -> bool:
    lo = 0  # min possible open
    hi = 0  # max possible open
    for ch in s:
        if ch == "(":
            lo += 1
            hi += 1
        elif ch == ")":
            lo = max(lo - 1, 0)
            hi -= 1
        else:  # '*'
            lo = max(lo - 1, 0)
            hi += 1
        if hi < 0:
            return False
    return lo == 0


print(checkValidString("(*)"))
`;

SOLUTIONS["insert-interval"] = `# Pattern: Intervals
from typing import List


def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    out: list[list[int]] = []
    i = 0
    start, end = newInterval
    while i < len(intervals) and intervals[i][1] < start:
        out.append(intervals[i])
        i += 1
    while i < len(intervals) and intervals[i][0] <= end:
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1
    out.append([start, end])
    while i < len(intervals):
        out.append(intervals[i])
        i += 1
    return out


print(insert([[1,3],[6,9]], [2,5]))
`;

SOLUTIONS["merge-intervals"] = `# Pattern: Intervals
from typing import List


def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    out = [intervals[0]]
    for s, e in intervals[1:]:
        if s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out


print(merge([[1,3],[2,6],[8,10],[15,18]]))
`;

SOLUTIONS["non-overlapping-intervals"] = `# Pattern: Intervals
from typing import List


def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[1])
    count = 1
    end = intervals[0][1]
    for s, e in intervals[1:]:
        if s >= end:
            count += 1
            end = e
    return len(intervals) - count


print(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))
`;

SOLUTIONS["meeting-rooms"] = `# Pattern: Intervals
from typing import List


def canAttendMeetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True


print(canAttendMeetings([[0,30],[5,10],[15,20]]))
`;

SOLUTIONS["meeting-rooms-ii"] = `# Pattern: Intervals
from typing import List
import heapq


def minMeetingRooms(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[0])
    heap: list[int] = []
    for s, e in intervals:
        if heap and heap[0] <= s:
            heapq.heappop(heap)
        heapq.heappush(heap, e)
    return len(heap)


print(minMeetingRooms([[0,30],[5,10],[15,20]]))
`;

SOLUTIONS["minimum-interval-to-include-each-query"] = `# Pattern: Intervals
from typing import List
import heapq


def minInterval(intervals: list[list[int]], queries: list[int]) -> list[int]:
    intervals.sort(key=lambda x: x[0])
    with_idx = sorted([(q, i) for i, q in enumerate(queries)])
    heap: list[tuple[int, int]] = []  # (len, r)
    res = [-1] * len(queries)

    j = 0
    for q, idx in with_idx:
        while j < len(intervals) and intervals[j][0] <= q:
            l, r = intervals[j]
            heapq.heappush(heap, (r - l + 1, r))
            j += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        if heap:
            res[idx] = heap[0][0]
    return res


print(minInterval([[1,4],[2,4],[3,6]], [2,3,4,5]))
`;

SOLUTIONS["rotate-image"] = `# Pattern: Math & Geometry
from typing import List


def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    # transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # reverse rows
    for i in range(n):
        matrix[i].reverse()


m = [[1,2,3],[4,5,6],[7,8,9]]
rotate(m)
print(m)
`;

SOLUTIONS["spiral-matrix"] = `# Pattern: Math & Geometry
from typing import List


def spiralOrder(matrix: list[list[int]]) -> list[int]:
    if not matrix or not matrix[0]:
        return []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    out: list[int] = []
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            out.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            out.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                out.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                out.append(matrix[r][left])
            left += 1
    return out


print(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))
`;

SOLUTIONS["set-matrix-zeroes"] = `# Pattern: Math & Geometry
from typing import List


def setZeroes(matrix: list[list[int]]) -> None:
    rows = len(matrix)
    cols = len(matrix[0]) if rows else 0
    row_has = [False] * rows
    col_has = [False] * cols
    for r in range(rows):
        for c in range(cols):
            if matrix[r][c] == 0:
                row_has[r] = True
                col_has[c] = True
    for r in range(rows):
        for c in range(cols):
            if row_has[r] or col_has[c]:
                matrix[r][c] = 0


m = [[1,1,1],[1,0,1],[1,1,1]]
setZeroes(m)
print(m)
`;

SOLUTIONS["happy-number"] = `# Pattern: Math & Geometry
def isHappy(n: int) -> bool:
    def nxt(x: int) -> int:
        s = 0
        while x:
            d = x % 10
            s += d * d
            x //= 10
        return s

    seen: set[int] = set()
    while n not in seen:
        seen.add(n)
        n = nxt(n)
        if n == 1:
            return True
    return False


print(isHappy(19))
`;

SOLUTIONS["plus-one"] = `# Pattern: Math & Geometry
from typing import List


def plusOne(digits: list[int]) -> list[int]:
    i = len(digits) - 1
    digits = digits[:]  # avoid mutating caller
    digits[i] += 1
    carry = digits[i] // 10
    digits[i] %= 10
    i -= 1
    while i >= 0 and carry:
        digits[i] += carry
        carry = digits[i] // 10
        digits[i] %= 10
        i -= 1
    if carry:
        digits = [carry] + digits
    return digits


print(plusOne([1,2,3]))
`;

SOLUTIONS["powx-n"] = `# Pattern: Math & Geometry
def myPow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    exp = n
    if exp < 0:
        x = 1.0 / x
        exp = -exp
    result = 1.0
    base = x
    while exp > 0:
        if exp % 2 == 1:
            result *= base
        base *= base
        exp //= 2
    return result


print(round(myPow(2.0, 10), 5))
`;

SOLUTIONS["multiply-strings"] = `# Pattern: Math & Geometry
from typing import List


def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    m, n = len(num1), len(num2)
    res = [0] * (m + n)
    a = [ord(ch) - 48 for ch in num1]
    b = [ord(ch) - 48 for ch in num2]
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = a[i] * b[j]
            pos1 = i + j
            pos2 = i + j + 1
            s = mul + res[pos2]
            res[pos2] = s % 10
            res[pos1] += s // 10
    # trim leading zeros
    i = 0
    while i < len(res) and res[i] == 0:
        i += 1
    return "".join(str(d) for d in res[i:]) if i < len(res) else "0"


print(multiply("123", "456"))
`;

SOLUTIONS["detect-squares"] = `# Pattern: Math & Geometry
from typing import List, Dict, Tuple
from collections import defaultdict


class DetectSquares:
    def __init__(self) -> None:
        # count by x,y
        self.cnt: Dict[Tuple[int, int], int] = defaultdict(int)

    def add(self, point: List[int]) -> None:
        x, y = point
        self.cnt[(x, y)] += 1

    def count(self, point: List[int]) -> int:
        x, y = point
        ans = 0
        # Choose another point with the same y to form one side.
        for (x2, y2), c in self.cnt.items():
            if y2 != y or x2 == x:
                continue
            side = abs(x2 - x)
            # square top/bottom y coordinates
            y3a = y + side
            y3b = y - side
            ans += c * self.cnt.get((x, y3a), 0) * self.cnt.get((x2, y3a), 0)
            ans += c * self.cnt.get((x, y3b), 0) * self.cnt.get((x2, y3b), 0)
        return ans


ds = DetectSquares()
ds.add([3, 10])
ds.add([11, 2])
ds.add([3, 2])
ds.add([11, 10])
print(ds.count([11, 10]))
`;

SOLUTIONS["single-number"] = `# Pattern: Bit Manipulation
def singleNumber(nums: list[int]) -> int:
    x = 0
    for v in nums:
        x ^= v
    return x


print(singleNumber([4,1,2,1,2]))
`;

SOLUTIONS["number-of-1-bits"] = `# Pattern: Bit Manipulation
def hammingWeight(n: int) -> int:
    # treat n as unsigned 32-bit
    n &= 0xFFFFFFFF
    cnt = 0
    while n:
        n &= n - 1
        cnt += 1
    return cnt


print(hammingWeight(11))
`;

SOLUTIONS["counting-bits"] = `# Pattern: Bit Manipulation
def countBits(n: int) -> list[int]:
    out: list[int] = [0] * (n + 1)
    for i in range(1, n + 1):
        out[i] = out[i >> 1] + (i & 1)
    return out


print(countBits(7))
`;

SOLUTIONS["reverse-bits"] = `# Pattern: Bit Manipulation
def reverseBits(n: int) -> int:
    n &= 0xFFFFFFFF
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res


print(reverseBits(43261596))
`;

SOLUTIONS["missing-number"] = `# Pattern: Bit Manipulation
def missingNumber(nums: list[int]) -> int:
    x = len(nums)
    for i, v in enumerate(nums):
        x ^= i ^ v
    return x


print(missingNumber([3,0,1]))
`;

SOLUTIONS["sum-of-two-integers"] = `# Pattern: Bit Manipulation
def getSum(a: int, b: int) -> int:
    # add without + using bit operations
    MASK = 0xFFFFFFFF
    a &= MASK
    b &= MASK
    while b:
        carry = (a & b) << 1
        a = (a ^ b) & MASK
        b = carry & MASK
    # convert to signed 32-bit
    return a if a <= 0x7FFFFFFF else ~(a ^ MASK)


print(getSum(1, 2))
`;

SOLUTIONS["reverse-integer"] = `# Pattern: Bit Manipulation
def reverseInt(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    res = 0
    while x:
        res = res * 10 + x % 10
        x //= 10
        # overflow check during build
        if res > 2**31 - 1:
            return 0
    res *= sign
    return res if -(2**31) <= res <= 2**31 - 1 else 0


print(reverseInt(120))
`;



