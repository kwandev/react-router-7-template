import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("app/ui/app-layout.tsx", [
    // index page
    index("pages/home/ui/index.tsx"),
  ]),
] satisfies RouteConfig;
