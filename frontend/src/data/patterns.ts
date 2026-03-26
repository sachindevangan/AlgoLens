export type PatternDifficulty = "beginner" | "intermediate" | "advanced";

export type Pattern = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: PatternDifficulty;
  icon: string;
  keyInsight: string;
  whenToUse: string[];
  timeComplexity: string;
  spaceComplexity: string;
  color: string;
  problemCount: number;
};

export const PATTERNS: Pattern[] = [
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    slug: "arrays-hashing",
    description:
      "Use hash maps and sets to achieve O(1) lookups and reduce time complexity from O(n²) to O(n).",
    difficulty: "beginner",
    icon: "Database",
    keyInsight:
      "Trade space for time — store seen values in a hash map to avoid nested loops.",
    whenToUse: [
      "Need to find duplicates or pairs",
      "Counting frequencies",
      "Need O(1) lookup",
      "Two elements that sum to target",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    color: "#06B6D4",
    problemCount: 9,
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    slug: "two-pointers",
    description:
      "Use two indices moving through data to solve problems in O(n) that would otherwise require O(n²).",
    difficulty: "beginner",
    icon: "ArrowLeftRight",
    keyInsight:
      "Two pointers eliminate the need for nested loops when working with sorted arrays or when searching from both ends.",
    whenToUse: [
      "Array is sorted",
      "Finding pairs with a condition",
      "Palindrome checks",
      "Removing duplicates in-place",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    color: "#7C3AED",
    problemCount: 5,
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    slug: "sliding-window",
    description:
      "Maintain a window of elements that slides across the array to track subarray properties without recomputation.",
    difficulty: "beginner",
    icon: "GalleryHorizontal",
    keyInsight:
      "Instead of recomputing the entire window each step, add the new element and remove the old one — O(n) total.",
    whenToUse: [
      "Longest/shortest subarray with condition",
      "Fixed-size window computation",
      "Substring problems",
      "Maximum sum of k elements",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) to O(k)",
    color: "#10B981",
    problemCount: 6,
  },
  {
    id: "stack",
    title: "Stack",
    slug: "stack",
    description:
      "Use LIFO structure to track state, match pairs, and find next greater/smaller elements efficiently.",
    difficulty: "beginner",
    icon: "Layers",
    keyInsight:
      "Monotonic stacks maintain sorted order as you push — pop when the invariant breaks to find relationships between elements.",
    whenToUse: [
      "Matching brackets or pairs",
      "Next greater element",
      "Valid sequence checking",
      "Undo/redo operations",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    color: "#F59E0B",
    problemCount: 7,
  },
  {
    id: "binary-search",
    title: "Binary Search",
    slug: "binary-search",
    description:
      "Eliminate half the search space each iteration by leveraging sorted order or monotonic properties.",
    difficulty: "beginner",
    icon: "Search",
    keyInsight:
      "Binary search works on any monotonic function, not just sorted arrays — search on the answer space when direct search is hard.",
    whenToUse: [
      "Array is sorted",
      "Finding boundary conditions",
      "Search on answer space (minimize/maximize)",
      "Rotated sorted arrays",
    ],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    color: "#EF4444",
    problemCount: 7,
  },
  {
    id: "linked-list",
    title: "Linked List",
    slug: "linked-list",
    description:
      "Master pointer manipulation, fast/slow pointers, and in-place reversal to solve linked list problems without extra space.",
    difficulty: "intermediate",
    icon: "Link",
    keyInsight:
      "Fast/slow pointers reach the middle or detect cycles without knowing the length — one pointer moves twice as fast.",
    whenToUse: [
      "Cycle detection",
      "Finding middle node",
      "Reversing in-place",
      "Merging sorted lists",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    color: "#8B5CF6",
    problemCount: 11,
  },
  {
    id: "trees",
    title: "Trees",
    slug: "trees",
    description:
      "Navigate hierarchical data with DFS and BFS, solve path problems, and understand BST properties.",
    difficulty: "intermediate",
    icon: "TreePine",
    keyInsight:
      "Most tree problems are solved with a simple DFS recursive function that returns info from children to build the parent's answer.",
    whenToUse: [
      "Hierarchical data traversal",
      "Path sum problems",
      "Level-order processing",
      "BST search/insert/delete",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) — tree height",
    color: "#06B6D4",
    problemCount: 15,
  },
  {
    id: "heap-priority-queue",
    title: "Heap / Priority Queue",
    slug: "heap-priority-queue",
    description:
      "Efficiently track the maximum or minimum element as the dataset changes, enabling Top-K and median problems.",
    difficulty: "intermediate",
    icon: "Triangle",
    keyInsight:
      "A heap gives you O(log n) insert and O(1) peek — use two heaps (max + min) to find running medians.",
    whenToUse: [
      "Top K elements",
      "K-th largest/smallest",
      "Merge K sorted lists",
      "Running median",
    ],
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    color: "#F59E0B",
    problemCount: 7,
  },
  {
    id: "backtracking",
    title: "Backtracking",
    slug: "backtracking",
    description:
      "Explore all possible solutions by building candidates incrementally and abandoning paths that cannot lead to a solution.",
    difficulty: "intermediate",
    icon: "GitBranch",
    keyInsight:
      "The backtracking template: choose → explore → unchoose. Pruning invalid paths early makes it exponentially faster.",
    whenToUse: [
      "Generate all subsets/permutations",
      "Constraint satisfaction",
      "Word search in grid",
      "N-Queens type problems",
    ],
    timeComplexity: "O(2^n) to O(n!)",
    spaceComplexity: "O(n)",
    color: "#EF4444",
    problemCount: 9,
  },
  {
    id: "tries",
    title: "Tries",
    slug: "tries",
    description:
      "A prefix tree that enables O(m) string search, autocomplete, and prefix matching where m is the word length.",
    difficulty: "intermediate",
    icon: "Type",
    keyInsight:
      "Tries share prefixes — inserting 1000 words with the same prefix only stores the prefix once, saving space and enabling O(m) prefix queries.",
    whenToUse: [
      "Prefix matching/autocomplete",
      "Word dictionary",
      "IP routing tables",
      "Spell checking",
    ],
    timeComplexity: "O(m)",
    spaceComplexity: "O(n*m)",
    color: "#10B981",
    problemCount: 3,
  },
  {
    id: "graphs",
    title: "Graphs",
    slug: "graphs",
    description:
      "Model relationships with BFS for shortest paths and DFS for connected components, cycle detection, and topological sort.",
    difficulty: "intermediate",
    icon: "Network",
    keyInsight:
      "Most grid problems are implicit graphs — each cell is a node, each adjacent cell is an edge. Apply BFS/DFS directly.",
    whenToUse: [
      "Shortest path (unweighted)",
      "Connected components",
      "Island counting",
      "Cycle detection",
      "Topological ordering",
    ],
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V+E)",
    color: "#7C3AED",
    problemCount: 13,
  },
  {
    id: "advanced-graphs",
    title: "Advanced Graphs",
    slug: "advanced-graphs",
    description:
      "Weighted shortest paths, minimum spanning trees, and complex graph algorithms for competitive-level problems.",
    difficulty: "advanced",
    icon: "Waypoints",
    keyInsight:
      "Dijkstra with a min-heap is O((V+E) log V) — always use it for weighted shortest paths with non-negative weights.",
    whenToUse: [
      "Weighted shortest path",
      "Minimum spanning tree",
      "Network flow",
      "Euler path",
    ],
    timeComplexity: "O((V+E) log V)",
    spaceComplexity: "O(V+E)",
    color: "#EF4444",
    problemCount: 6,
  },
  {
    id: "1d-dynamic-programming",
    title: "1D Dynamic Programming",
    slug: "1d-dynamic-programming",
    description:
      "Break problems into overlapping subproblems and store results to avoid recomputation — bottom-up or top-down.",
    difficulty: "intermediate",
    icon: "TrendingUp",
    keyInsight:
      "If a problem asks for optimal (max/min/count) and has overlapping subproblems, think DP. Start with the recurrence relation.",
    whenToUse: [
      "Fibonacci-style recurrences",
      "House robber pattern",
      "Coin change",
      "Longest increasing subsequence",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) or O(1)",
    color: "#06B6D4",
    problemCount: 12,
  },
  {
    id: "2d-dynamic-programming",
    title: "2D Dynamic Programming",
    slug: "2d-dynamic-programming",
    description:
      "Extend DP to two dimensions for string comparison, grid path counting, and complex optimization problems.",
    difficulty: "advanced",
    icon: "Grid",
    keyInsight:
      "2D DP table rows represent one sequence and columns another — each cell builds on its neighbors to the top and left.",
    whenToUse: [
      "Edit distance / LCS",
      "Grid path counting",
      "Knapsack variants",
      "String matching",
    ],
    timeComplexity: "O(n*m)",
    spaceComplexity: "O(n*m)",
    color: "#8B5CF6",
    problemCount: 11,
  },
  {
    id: "greedy",
    title: "Greedy",
    slug: "greedy",
    description:
      "Make the locally optimal choice at each step — works when local optimum leads to global optimum.",
    difficulty: "intermediate",
    icon: "Zap",
    keyInsight:
      "Prove greedy works by showing no other choice at each step could lead to a better global outcome.",
    whenToUse: [
      "Interval scheduling",
      "Jump game variants",
      "Activity selection",
      "Minimum number of operations",
    ],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    color: "#F59E0B",
    problemCount: 8,
  },
  {
    id: "intervals",
    title: "Intervals",
    slug: "intervals",
    description:
      "Sort and merge overlapping intervals, find gaps, and schedule events efficiently.",
    difficulty: "intermediate",
    icon: "AlignJustify",
    keyInsight:
      "Always sort intervals by start time first — then merge by checking if current start ≤ previous end.",
    whenToUse: [
      "Merging overlapping intervals",
      "Meeting room scheduling",
      "Finding free time slots",
      "Insert interval",
    ],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    color: "#10B981",
    problemCount: 6,
  },
  {
    id: "math-geometry",
    title: "Math & Geometry",
    slug: "math-geometry",
    description:
      "Solve problems using mathematical properties — modular arithmetic, bit tricks, and geometric transformations.",
    difficulty: "intermediate",
    icon: "Calculator",
    keyInsight:
      "Matrix rotation in-place: transpose then reverse rows. Spiral traversal: peel off layers one at a time.",
    whenToUse: [
      "Matrix rotation/spiral",
      "Happy number detection",
      "Power computation",
      "Geometry intersections",
    ],
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    color: "#EF4444",
    problemCount: 8,
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    slug: "bit-manipulation",
    description:
      "Use XOR, AND, OR, and shifts to solve problems in O(1) space with elegant single-pass solutions.",
    difficulty: "intermediate",
    icon: "Binary",
    keyInsight:
      "XOR of a number with itself is 0 — XOR all numbers to find the one that appears once. n & (n-1) clears the lowest set bit.",
    whenToUse: [
      "Finding unique number",
      "Counting set bits",
      "Power of two check",
      "Subset generation",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    color: "#7C3AED",
    problemCount: 7,
  },
];
