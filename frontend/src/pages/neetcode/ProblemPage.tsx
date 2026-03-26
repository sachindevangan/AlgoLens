import { useParams } from "react-router-dom";

export default function ProblemPage() {
  const params = useParams<{ problemSlug: string }>();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold text-white">Problem</h1>
      <p className="mt-2 text-muted">
        Read the problem statement, see examples and constraints, then
        visualize the execution of your solution for {params.problemSlug ?? "this problem"}.
      </p>
    </div>
  );
}

