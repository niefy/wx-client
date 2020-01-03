<template>
    <div class="cell" :class="{'solid-top':topBorder}" @click="onClick">
        <div class="cell-icon">
            <slot name="icon"></slot>
        </div>
        <div class="cell-content">
            <div class="cell-title" v-html="addHighLight(title)">
                <span class="cell-label" v-if="label">{{label}}</span>
            </div>
            <div class="cell-description" v-html="addHighLight(description)"></div>
        </div>
        <div class="cell-right">
            <slot name="cell-right" v-if="!isLink"></slot>
            <span v-if="isLink" class="arrow-right">&gt;</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ListCell',
        props: {
            title: String,
            description: String,
            label: String,
            icon: String,
            link: String,
            highLightWords: String,//高亮的文字
            isLink: {
                type: Boolean,
                default: false
            },
            topBorder:Boolean
        },
        methods: {
            addHighLight(text) {//添加关键词高亮
                if (!text || !this.highLightWords || text.indexOf(this.highLightWords) < 0) {//内容无关键词
                    return text;
                }
                return text.replace(new RegExp(this.highLightWords, "g"), '<span style="color: #ff6623">' + this.highLightWords + '</span>');
            },
            onClick(){
                if(this.isLink && this.link)this.$go(this.link)
            }
        }
    }

</script>
<style scoped>
    .cell {
        width: 100%;
        padding: 0.6rem 0.75rem 0.6rem 0;
        box-sizing: border-box;
        line-height: 1.2rem;
        background-color: #fff;
        color: #434343;
        font-size: 0.7rem;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .cell-icon img {
        width: 2rem;
        height: auto;
        margin-left: 1rem;
        display: inline-block;
        vertical-align: middle;
    }

    .cell-content {
        flex: 1;
        margin-left: 0.5rem;
    }

    .cell-title {
        font-size: 1rem;
        color: #030303;
        line-height: 1.5rem;
    }

    .cell-label {
        color: #ff0000;
        border: 1px solid #ff0000;
        padding: 2px 6px;
        border-radius: 3px;
        margin-left: 0.5rem;
        font-size: 0.8rem;
    }

    .cell-description {
        display: block;
        font-size: 0.8rem;
        line-height: 1.2;
        color: #a0a0a0;
    }

    .arrow-right {
        font-size: 1.1rem;
        font-weight: bold;
        color: #DADADA;
    }
</style>
