import Image from "next/image";
import UserSearch from "./components/Usersearch";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col align-center  items-center justify-center p-4 h-120">
        <div className="text-5xl font-bold p-3">
        URL Shortner
      </div>
      <UserSearch/>
      </div>
    </main>
  );
}
