// app/test/page.tsx or pages/test.tsx
"use client";
import { useUser } from "@clerk/nextjs";

export default function TestPage() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      {user ? <h2>Logged in: {user.emailAddresses[0].emailAddress}</h2> : <h2>Not signed in</h2>}
    </div>
  );
}
