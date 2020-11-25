import detect from "@/plugins/detect";
import http from "@/plugins/http";
import rpc from "@/plugins/rpc";

import IconSvg from "@/components/IconSvg";
import Dialog from "@/components/Dialog";
import Alert from "@/components/Alert";

const requireAll = (requireContext) =>
    requireContext.keys().map(requireContext);
const req = require.context("../assets/icons", false, /\.svg$/);
requireAll(req);

export default {
    install: (vue) => {
        vue.component("icon-svg", IconSvg);

        vue.prototype.$http = http;
        vue.prototype.$rpc = rpc;
        vue.prototype.$uniDialog = Dialog;
        vue.prototype.$uniAlert = Alert;
        vue.prototype.$browser = detect.browser;
    },
};
