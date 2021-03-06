import Router from "koa-router";
import {
  createScriptTag,
  deleteScriptTagById,
  getAllScriptTags,
} from "../controllers/script_tag_controller";

const router = new Router({ prefix: "/script_tag" });

router.get("/", async (ctx) => {
  ctx.body = "Get script tags";
});

router.get("/all", async (ctx) => {
  const result = await getAllScriptTags(ctx.myClient, "https://google.com/");

  ctx.body = {
    installed: result.length > 0,
    details: result,
  };
});

router.post("/", async (ctx) => {
  await createScriptTag(ctx.myClient);
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  const id = ctx.query.id;
  const result = await deleteScriptTagById(ctx.myClient, id);
  ctx.body = result;
});

export default router;
