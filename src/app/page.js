import Midsem from "@/components/midsem";

export default function Home() {
  return (
    <div>
      <div className="mb-0">
        <nav className="flex left-4 px-4 pt-1">
          <ul>
            <li className="ml-4 text-md">
              <a className="text-blue-600 underline" href="https://mdrahbar.in">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Midsem />
      <p className="text-center text-sm text-gray-500">With ❤️ Md Rahbar</p>
    </div>
  );
}
