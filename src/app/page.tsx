import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { EmployeeFormWithSections } from './_components/selfservice'; 
import { Sidebar, SidebarProvider, SidebarTrigger  } from "~/components/ui/sidebar";


export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();


  return (
    <HydrateClient>
     
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff] text-block">
         <SidebarProvider>
          <Sidebar />
          <SidebarTrigger/>
          <EmployeeFormWithSections/>
    </SidebarProvider>
        
      </main>
    </HydrateClient>
  );
}
