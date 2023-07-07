import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/upload">Upload a file</Link>
      </li>
    </ul>
  );
}
