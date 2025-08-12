import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("pages/layouts/app-layout.tsx", [
    // index page
    index("pages/home.tsx"),
  ]),
] satisfies RouteConfig;
