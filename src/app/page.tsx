import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/upload">Upload a file</Link>
      </li>
      <li>
        <Link href="/showcase">Go Showcase</Link>
      </li>
    </ul>
  );
}
