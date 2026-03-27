export const storage = {
  getCompletedProblems(): string[] {
    try {
      return JSON.parse(localStorage.getItem("completed") ?? "[]");
    } catch {
      return [];
    }
  },
  markComplete(slug: string): void {
    const completed = this.getCompletedProblems();
    if (!completed.includes(slug)) {
      localStorage.setItem("completed", JSON.stringify([...completed, slug]));
    }
  },
  isComplete(slug: string): boolean {
    return this.getCompletedProblems().includes(slug);
  },
  saveDraft(key: string, code: string): void {
    localStorage.setItem(`draft-${key}`, code);
  },
  getDraft(key: string): string | null {
    return localStorage.getItem(`draft-${key}`);
  },
  clearDraft(key: string): void {
    localStorage.removeItem(`draft-${key}`);
  },
};
