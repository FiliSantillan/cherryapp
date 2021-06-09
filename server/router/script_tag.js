import Router from "koa-router";
import {
  createScriptTag,
  getAllScriptTags,
} from "../controllers/script_tag_controller";

const router = new Router({ prefix: "/script_tag" });

router.get("/", async (ctx) => {
  ctx.body = "Get script tags";
});

router.get("/all", async (ctx) => {
  const result = await getAllScriptTags(ctx.myClient, "https://google.com/");

  ctx.body = {
    installed: result,
  };
});

router.post("/", async (ctx) => {
  console.log("create script tag", ctx.sessionFromToken);
  //const { shop, accessToken } = ctx.sessionFromToken;
  await createScriptTag(ctx.myClient);
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  ctx.body = "Delete script tag";
});

export default router;
