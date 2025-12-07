'use client';

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}))

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button onClick={() => invoke.mutate({ text: 'Test' })}>
        Invoke Background Job
      </Button>
    </div>
  )
}

export default Page;











// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { Client } from "./client";
// import { Suspense } from "react";

// const Page = async () => {
//   const queryClient = getQueryClient();
//   void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: 'John b' }));

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<div>Loading...</div>}>
//       <Client />
//       </Suspense>
//     </HydrationBoundary>
//   )
// } 

// export default Page;










// 'use client';

// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

// const Page = () => {
//   const trpc = useTRPC();
//   const { data } = useQuery(trpc.hello.queryOptions({ text: 'John' }))

//   return (
//     <div className="text-3xl font-bold underline">
//       {JSON.stringify(data)}
//     </div>
//   );
// };

// export default Page;

// server component
// import { caller } from "@/trpc/server";

// const Page = async () => {
//   const data = await caller.hello({ text: 'John' });

//   return (
//     <div>
//       {JSON.stringify(data)}
//     </div>
//   )
// }

// export default Page;