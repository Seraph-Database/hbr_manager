<template>
    <page-title :title="`Dimension Battle Viewer`" />
    <div class="planet-system">
        <div class="rings">
            <img draggable="false" class="ring" :src="`/di/fixed_dimensionBgRing01.webp`" />
            <img draggable="false" class="ring ring__inner" :src="`/di/fixed_dimensionBgRing01.webp`" />
            <img draggable="false" class="ring ring__inner-2" :src="`/di/fixed_dimensionBgRing01.webp`" />
            <img draggable="false" class="ring ring__inner-3" :src="`/di/DimentionEffect01.webp`" />
        </div>
        <div class="icons">
            <v-btn color="transparent" :variant="'tonal'" class="rounded-circle central" min-width="17.5vh" width="17.5vh"
                height="17.5vh">
                <v-img :src="`/di/dimensionEnemyFrame.webp`" width="17.5vh" height="17.5vh">
                    <img class="central__image" :src="`/di/DimensionBattleCentralTop_001.webp`" />
                </v-img>
            </v-btn>
            <v-btn color="transparent" :variant="'tonal'" class="rounded-circle side side--top-right" min-width="10vh"
                width="10vh" height="10vh">
                <v-img :src="false ? `/di/ExtraEnemyClearFrame.webp` : undefined" width="10vh" height="10vh">
                    <img class="side__image" :src="`/di/ExtraEnemyNormal.webp`" />
                </v-img>
            </v-btn>
            <v-btn color="transparent" :variant="'tonal'" class="rounded-circle side side--bottom-right" min-width="10vh"
                width="10vh" height="10vh">
                <v-img :src="false ? `/di/ExtraEnemyClearFrame.webp` : undefined" width="10vh" height="10vh">
                    <img class="side__image" :src="`/di/ExtraEnemyNormal.webp`" />
                </v-img>
            </v-btn>
            <v-btn color="transparent" :variant="'tonal'" class="rounded-circle side side--top-left" min-width="10vh"
                width="10vh" height="10vh">
                <v-img :src="false ? `/di/ExtraEnemyClearFrame.webp` : undefined" width="10vh" height="10vh">
                    <img class="side__image" :src="`/di/ExtraEnemyNormal.webp`" />
                </v-img>
            </v-btn>
            <v-btn color="transparent" :variant="'tonal'" class="rounded-circle side side--bottom-left" min-width="10vh"
                width="10vh" height="10vh">
                <v-img :src="false ? `/di/ExtraEnemyClearFrame.webp` : undefined" width="10vh" height="10vh">
                    <img class="side__image" :src="`/di/ExtraEnemyNormal.webp`" />
                </v-img>
            </v-btn>
        </div>
    </div>
    <v-img class="battle-window text-HBR" gradient="to right, #181a2863, #5d162e63, #3a486063" width="100%"
        min-height="48rem">
        <v-row :class="`first-line`" no-gutters class="mx-7 my-3">
            <v-col class="mr-3 px-5 py-2 rounded-pill">Team Power</v-col>
            <v-col class="mr-3 px-5 py-2 rounded-pill">Enchant Passive</v-col>
            <v-col class="px-5 py-2 rounded-pill placeholder" cols="7"></v-col>
        </v-row>
        <v-row no-gutters class="mx-7">
            <v-col class="mr-3">
                <v-sheet class="rounded-xl enemy-info" color="#363636aa" height="8rem" width="100%"></v-sheet>
            </v-col>
            <v-col>
                <v-sheet class="rounded-xl enemy-info" color="#363636aa" height="12rem" width="100%"></v-sheet>
            </v-col>
        </v-row>
    </v-img>
</template>

<script lang="ts" setup>
import PageTitle from '@/components/default/PageTitle.vue'
</script>

<style lang="scss" scoped>
.planet-system {
    width: 100%;
    height: auto;
    perspective: 128rem;
    // position: fixed;
}

.battle-window {
    margin-top: 30%;
    border-top: 0.125rem solid #ffffff63;
    box-shadow: 0 0 0.5rem #ffffff33
}

.enemy-info {
    border: 0.1875rem solid #534353
}

.first-line {
    .v-col {
        background-color: #00000088;
        color: #fff;

        &.placeholder {
            opacity: 0;
        }
    }
}

.rings,
.icons {
    transform: rotateX(75deg) rotateY(-5deg);
    transform-style: preserve-3d;
    position: absolute;
    right: calc(50% - calc(100vh / 2));
    transition: .25s all;

    .central {
        position: absolute;
        top: calc(50vh - calc(17.5vh / 0.75));
        right: calc(50vh - calc(17.5vh / 2));
        transform: rotateX(-75deg) rotateY(5deg) rotateZ(5deg);
        transition: .25s all;

        &:hover {
            transform: scale3d(0.9, 0.9, 0.9) rotateX(-75deg) rotateY(5deg) rotateZ(5deg);
        }

        .central__image {
            width: 14vh;
            height: 14vh;
            position: absolute;
            top: 1.75vh;
            right: 1.75vh;
        }
    }

    .side {
        position: absolute;
        transform: rotateX(-75deg) rotateY(5deg) rotateZ(5deg);
        transition: .25s all;

        &:hover {
            transform: scale3d(0.9, 0.9, 0.9) rotateX(-75deg) rotateY(5deg) rotateZ(5deg);
        }

        &.side--top-right {
            // Desktop
            // top: calc(20vh - calc(10vh / 0.75));
            // right: calc(20vh - calc(10vh / 2));
            // Mobile
            top: calc(41vh - calc(10vh / 0.75));
            right: calc(33.5vh - calc(10vh / 2));
        }

        &.side--bottom-right {
            // Desktop
            // top: calc(80vh - calc(10vh / 0.75));
            // right: calc(20vh - calc(10vh / 2));
            // Mobile
            top: calc(80vh - calc(10vh / 0.75));
            right: calc(21vh - calc(10vh / 2));
        }

        &.side--top-left {
            // Desktop
            // top: calc(80vh - calc(10vh / 0.75));
            // right: calc(20vh - calc(10vh / 2));
            // Mobile
            top: calc(25.5vh - calc(10vh / 0.75));
            right: calc(65.5vh - calc(10vh / 2));
        }

        &.side--bottom-left {
            // Desktop
            // top: calc(80vh - calc(10vh / 0.75));
            // right: calc(20vh - calc(10vh / 2));
            // Mobile
            top: calc(65vh - calc(10vh / 0.75));
            right: calc(73.25vh - calc(10vh / 2));
        }

        .side__image {
            width: 8.5vh;
            height: 8.5vh;
            position: absolute;
            top: 0.75vh;
            right: 0.75vh;
            z-index: 1;
        }
    }
}

img {
    &.ring {
        width: 100vh;
        height: 100vh;
        // max-width: 100vw;
        position: absolute;
        top: 0;
        right: 0;
        // transform: rotateX(70deg) rotateY(-5deg);
        transform-style: preserve-3d;
        opacity: 0.75;
        animation: rotate 160s infinite linear;
        user-select: none;
        opacity: 0.5;
        // filter: drop-shadow(1rem 1rem 0 #ffffff36);

        &.ring__inner {
            top: calc(50vh - calc(75vh / 2));
            right: calc(50vh - calc(75vh / 2));
            animation: rotate 120s infinite linear;
            width: 75vh;
            height: 75vh;
        }

        &.ring__inner-2 {
            top: calc(50vh - calc(50vh / 2));
            right: calc(50vh - calc(50vh / 2));
            animation: rotate 80s infinite linear;
            width: 50vh;
            height: 50vh;
        }

        &.ring__inner-3,
        &.ring__inner-4 {
            top: calc(50vh - calc(25vh / 1.95));
            right: calc(50vh - calc(25vh / 2));
            animation: rotate 40s infinite linear;
            width: 25vh;
            height: 25vh;
        }

        &.ring__inner-4 {
            top: calc(50vh - calc(25vh / 2.05));
            transform: scale(-1);
            display: none;
        }
    }
}

@media (max-aspect-ratio: 1/1) {
    .battle-window {
        display: none;
    }

    .icons {

        .side {
            position: absolute;
            transform: rotateX(-75deg) rotateY(5deg) rotateZ(5deg);

            &.side--top-right {
                // Desktop
                top: calc(26vh - calc(10vh / 0.75));
                right: calc(35vh - calc(10vh / 2));
                // Mobile
                // top: calc(41vh - calc(10vh / 0.75));
                // right: calc(33.5vh - calc(10vh / 2));
            }

            &.side--bottom-right {
                // Desktop
                top: calc(80vh - calc(10vh / 0.75));
                right: calc(38vh - calc(10vh / 2));
                // Mobile
                // top: calc(80vh - calc(10vh / 0.75));
                // right: calc(21vh - calc(10vh / 2));
            }

            &.side--top-left {
                // Desktop
                top: calc(92.5vh - calc(10vh / 0.75));
                right: calc(62.5vh - calc(10vh / 2));
                // Mobile
                // top: calc(25.5vh - calc(10vh / 0.75));
                // right: calc(65.5vh - calc(10vh / 2));
            }

            &.side--bottom-left {
                // Desktop
                top: calc(39vh - calc(10vh / 0.75));
                right: calc(65vh - calc(10vh / 2));
                // Mobile
                // top: calc(65vh - calc(10vh / 0.75));
                // right: calc(73.25vh - calc(10vh / 2));
            }
        }
    }
}

@keyframes rotate {
    to {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
    }
}

@keyframes rotateOpposite {
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>