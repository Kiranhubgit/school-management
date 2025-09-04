import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /addSchool when visiting /
    router.replace("/addSchool");
  }, [router]);

  return null; // Nothing is shown because it redirects immediately
}
