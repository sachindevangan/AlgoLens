import { useParams } from "react-router-dom";

export default function PatternDetailPage() {
  const params = useParams<{ patternSlug: string }>();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold text-white">Pattern Detail</h1>
      <p className="mt-2 text-muted">
        View the selected pattern&apos;s overview and explore related problems
        for {params.patternSlug ?? "this topic"}.
      </p>
    </div>
  );
}

