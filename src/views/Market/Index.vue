/** * Created by Lay Hunt on 2020-11-18 09:55:23. */
<template>
    <div class="index">
        <div class="container">
            <h2 class="title">market</h2>
            <div class="filter">
                <div class="name">
                    <div class="name-item" @click="active_cate = 'materials'">
                        Classification
                    </div>
                    <div class="name-item" @click="active_cate = 'themes'">
                        Theme
                    </div>
                    <div class="name-item" @click="active_cate = 'price'">
                        Price
                    </div>
                </div>
                <div class="catetory">
                    <div
                        class="catetory-item"
                        @click="requestFilterData(v)"
                        v-for="(v, i) in categoryList"
                        :key="i"
                    >
                        <div v-if="active_cate == 'price'">
                            {{ v.gte ? v.gte : "低于" }}
                            {{ v.gte && v.lt ? " - " : "" }}
                            {{ v.lt ? v.lt : "以上" }}
                        </div>
                        <div v-else>
                            {{ v.title || "unknown" }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" v-loading="isLoading">
                <Thumbnail :list="list" :isGroup="true"></Thumbnail>
            </div>
            <div class="pagenation" v-if="hasPrev || hasNext">
                <div
                    class="prev"
                    @click="prev"
                    :class="{ 'no-prev': !hasPrev }"
                ></div>
                <div
                    class="next"
                    @click="next"
                    :class="{ 'no-next': !hasNext }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "index",
    components: { Thumbnail },
    data() {
        return {
            list: [],
            page: 1,
            priceInterval: [],
            per_page: 18,
            total_pages: 0,
            total_count: 0,
            category_id: "",
            theme_id: "",
            material_id: "",
            price_gte: "",
            price_lt: "",
            active_cate: "materials",
            isLoading: true,
        };
    },
    created() {
        if (this.materials.length > 0) {
            this.material_id = this.materials[0].id;
            this.requestData();
        }
        this.requsetPriceLimit();
    },
    computed: {
        categoryList() {
            if (this.active_cate == "price") {
                return this.priceInterval;
            }
            return this.$store.state.art[this.active_cate];
        },
        materials() {
            return this.$store.state.art.materials;
        },
        hasPrev() {
            return this.page > 1;
        },
        hasNext() {
            return this.page < this.total_pages;
        },
    },
    watch: {
        materials(value) {
            if (value.length > 0) {
                this.material_id = value[0].id;
                this.requestData();
            }
        },
    },
    methods: {
        // need to fix
        requestData() {
            this.isLoading = true;
            let obj = {
                page: this.page,
                per_page: this.per_page,
            };
            if (this.category_id) {
                obj.category_id = this.category_id;
            } else if (this.theme_id) {
                obj.theme_id = this.theme_id;
            } else if (this.material_id) {
                obj.material_id = this.material_id;
            }
            if (this.price_gte) {
                obj.price_gte = this.price_gte;
            }
            if (this.price_lt) {
                obj.price_lt = this.price_lt;
            }
            this.$http
                .globalGetSellingArt(obj)
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        this.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        next() {
            if (this.hasNext) {
                this.page++;
                this.requestData();
            }
        },
        prev() {
            if (this.hasPrev) {
                this.page--;
                this.requestData();
            }
        },
        requestFilterData(item) {
            this.page = 1;
            this.resetActive_cate(item);
            this.requestData();
        },
        requsetPriceLimit() {
            this.$http
                .globalGetPriceInterval({})
                .then((res) => {
                    this.priceInterval = res;
                })
                .catch((err) => {
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        resetActive_cate(item) {
            switch (this.active_cate) {
                case "materials":
                    this.category_id = "";
                    this.material_id = item.id;
                    this.price_gte = "";
                    this.price_lt = "";
                    this.theme_id = "";
                    break;
                case "themes":
                    this.theme_id = item.id;
                    this.material_id = "";
                    this.price_gte = "";
                    this.price_lt = "";
                    this.category_id = "";
                    break;
                case "price":
                    this.price_gte = item.gte || "";
                    this.price_lt = item.lt || "";
                    this.material_id = "";
                    this.category_id = "";
                    this.theme_id = "";
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.index {
    padding-top: 60px;
}
.container {
    min-height: 100px;
}
h2.title {
    font-family: "Broadway";
    font-size: 44px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 60px;
}

.filter {
    display: flex;
    flex-direction: column;
    .name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 40px;
    }
    .name-item {
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0px;
        margin-right: 82px;
        cursor: pointer;
    }
    .catetory {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 71px;
    }
    .catetory-item {
        border: 2px solid #020202;
        padding: 7px 15px;
        margin-right: 50px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0px;
        min-width: 150px;
        cursor: pointer;
    }
}

.content {
    margin-bottom: 100px;
    min-height: 100px;
}

.pagenation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 133px;
    .prev {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/zuo@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .next {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/you@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .prev.no-prev,
    .next.no-next {
        opacity: 0.3;
        cursor: not-allowed;
    }
}
</style>
