import Router from "koa-router";
import { createScriptTag } from "../controllers/script_tag_controller";
const router = new Router({ prefix: "/script_tag" });

router.get("/", async (ctx) => {
  ctx.body = "Get script tags";
});

router.get("/all", async (ctx) => {
  ctx.body = "Get all script tag";
});

router.post("/", async (ctx) => {
  const { shop, accessToken, scope } = ctx.state.shopify;
  await createScriptTag(shop, accessToken);
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  ctx.body = "Delete script tag";
});

export default router;
