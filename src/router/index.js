const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home/Index.vue"),
    },
    {
        path: "/market",
        name: "Market",
        component: () =>
            import(/* webpackChunkName: "market" */ "@/views/Market/Index.vue"),
    },
    {
        path: "/artist",
        name: "Artist",
        component: () =>
            import(/* webpackChunkName: "artist" */ "@/views/Artist/Index.vue"),
    },
    {
        path: "/artist-detail/:id",
        name: "ArtistDetail",
        component: () =>
            import(
                /* webpackChunkName: "artist" */ "@/views/Artist/Detail.vue"
            ),
    },
    {
        path: "/art/:id",
        name: "ArtDetail",
        component: () =>
            import(/* webpackChunkName: "art" */ "@/views/Art/Index.vue"),
    },
    {
        path: "/account",
        name: "Account",
        component: () =>
            import(
                /* webpackChunkName: "account" */ "@/views/Account/Index.vue"
            ),
    },
];

export default routes;
