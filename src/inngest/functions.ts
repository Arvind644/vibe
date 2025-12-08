import { Sandbox } from "@e2b/code-interpreter";
import { openai, createAgent } from "@inngest/agent-kit";
import { getSandbox } from "@/inngest/utils";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-test-arvind");
      return sandbox.sandboxId;
    })
    
    // const summarizer = createAgent({
    //   name: "summarizer",
    //   system: "You are an expert summarizer, You summarizer in 2 words.",
    //   model: openai({model: "gpt-4o"}),
    // })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You can write readable and maintainable code. You write simple Next.js and React snippets.",
      model: openai({model: "gpt-4o"}),
    })

    // const { output } =  await codeAgent.run(
    //   `Summarize the following text: ${event.data.value}`
    // )

    const { output } =  await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    )

    // console.log(output);

    // await step.sleep("wait-a-moment", "5s");
    // return { message: `Hello ${event.data.value}!` };

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000)
      return `http://${host}`
    })
    
    return { output, sandboxUrl }
  },
);