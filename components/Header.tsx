import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import AdminButton from "./admin/SearchComponents/AdminButtonComponent";


const Header = async () => {

  return (
    <header className="my-10 flex justify-between gap-5 bg-gradient-to-r from-[#ffcc88] via-[#ffb066] to-[#ff9966] p-4 rounded-2xl shadow-xl border-4 border-[#d87e42]">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={60} height={40} className="" />
      </Link>

      <ul className="flex flex-row items-center gap-8 mr-12">
        <li className="flex flex-row gap-10 ">
          <form
            action={async () => {
              "use server";
              redirect("/my-profile");
            }}
          >
            <Button className="h-20 w-40 px-12">
              <h2 className="text-xl">Account</h2>
            </Button>
          </form>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="h-20 w-40">
              <h2 className="text-xl">Logout</h2>
            </Button>
          </form>

          <AdminButton />
        </li>
      </ul>
    </header>
  );
};

export default Header;