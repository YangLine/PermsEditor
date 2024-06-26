<template>
  <div id="app">
    <nav id="nav">
      <div>
        <router-link to="/" class="logo">
          <img alt="LuckPerms logo" src="@/assets/logo.svg">
          <span>LuckPerms</span>
        </router-link>
      </div>

      <ul :class="{ active: menu, 'top-level': true }">
<!--        <li-->
<!--          v-show="showSearchBar"-->
<!--          class="search-container"-->
<!--        >-->
<!--          <div id="docsearch"></div>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span :class="{ 'router-link-active': isToolsRoute, tools: true }">-->
<!--            <font-awesome icon="tools" fixed-width />-->
<!--            {{ $t('links.tools.name') }}-->
<!--          </span>-->
<!--          <ul>-->
            <li>
              <router-link to="/editor">
<!--                <font-awesome icon="edit" fixed-width />-->
                <span class="material-symbols-outlined">edit</span>
                <span>{{ $t('links.tools.editor') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/verbose">
<!--                <font-awesome icon="comment-alt" fixed-width />-->
                <span class="material-symbols-outlined">pest_control</span>
                <span>{{ $t('links.tools.verbose') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/treeview">
<!--                <font-awesome icon="sitemap" fixed-width />-->
                <span class="material-symbols-outlined">account_tree</span>
                <span>{{ $t('links.tools.tree') }}</span>
              </router-link>
            </li>
<!--          </ul>-->
<!--        </li>-->
        <li v-if="locale" @click="localeMenu = !localeMenu">
          <span class="locale">
<!--            <font-awesome icon="language" fixed-width />-->
            <span class="material-symbols-outlined">language</span>
            <span class="locale-label">{{ $t('links.language') }}</span>
          </span>
          <ul :class="['locale-menu', { open: !!localeMenu }]">
            <li
              v-for="l in locales"
              :key="l.code" @click="setLocale(l.code)"
              :class="[{selected: l === locale}]"
            >
              <span>
                <span :class="['fi', 'fi-' + l.countryCode]" :alt="l.name" /> {{ l.name }}
              </span>
            </li>
          </ul>
        </li>
      </ul>

      <button
        id="nav-menu-toggle"
        @click="menu = !menu"
      >
<!--        <font-awesome icon="bars" />-->
        <span class="material-symbols-outlined">menu_open</span>
      </button>

      <transition name="fade">
        <div
          id="nav-focus"
          class="overlay-focus"
          v-if="menu"
          @click="menu = !menu"
        ></div>
      </transition>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <footer>
      <div class="footer">
        <ul>
          <li>
            <font-awesome icon="code-branch" fixed-width />
            <a href="https://github.com/YangLine/PermsEditor" target="_blank">PermEditor</a>
            @
            <a :href="'https://github.com/YangLine/PermsEditor/commit/' + commitHash" target="_blank">{{ commitHash }}</a>
          </li>
          <li>
            <span>
              Copyright © {{ new Date().getFullYear().toString() }} Craft Space Team | LuckPerms contributors
            </span>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import '@docsearch/css';
import docsearch from '@docsearch/js';

export default {
  metaInfo: {
    titleTemplate: '%s | LuckPerms',
    meta: [
      {
        property: 'og:title',
        content: 'LuckPerms',
      },
      {
        property: 'og:description',
        content: 'Website & online apps for the LuckPerms plugin.',
      },
      {
        property: 'og:type',
        content: 'product',
      },
      {
        property: 'og:image',
        content: 'https://luckperms.net/logo.png',
      },
      {
        property: 'og:url',
        content: 'https://luckperms.net/',
      },
      {
        property: 'og:site_name',
        content: 'LuckPerms - A permissions plugin for Minecraft servers.',
      },
    ],
  },

  data() {
    return {
      menu: false,
      localeMenu: false,
    };
  },

  computed: {
    commitHash() {
      return process.env.VUE_APP_GIT_HASH;
    },
    locale() {
      return this.$store.getters.userLocale;
    },
    locales() {
      return this.$store.getters.supportedLanguages;
    },
    version() {
      return this.$store.getters.version;
    },
    config() {
      return this.$store.getters.config;
    },
    showSearchBar() {
      // the editor has 2 search bars, lets not add another one :)
      const routes = ['editor', 'editor-home'];

      return !routes.includes(this.$route.name);
    },
    isToolsRoute() {
      return [
        'editor',
        'editor-home',
        'verbose',
        'verbose-home',
        'tree',
        'tree-home',
      ].includes(this.$route.name);
    },
    isSponsorRoute() {
      return this.$route.name === 'sponsor';
    },
  },

  created() {
    this.$store.dispatch('getAppData');
  },

  mounted() {
    docsearch({
      container: '#docsearch',
      appId: 'ZXKCPO8F1T',
      indexName: 'luckperms',
      apiKey: 'a37e3bc32993f2eb764d0c84dbd526e9',
    });
  },

  methods: {
    setLocale(locale) {
      this.$store.dispatch('setUserLocale', locale);
    },
  },

  watch: {
    $route() {
      this.menu = false;
    },
  },
};
</script>

<style lang="scss">
@import './scss/variables';

:root {
  --docsearch-footer-background: #{$grey};
  --docsearch-footer-shadow: unset;
  --docsearch-highlight-color: rgba(255, 255, 255, .25);
  --docsearch-hit-background: #{$grey};
  --docsearch-hit-color: #f2f2f2;
  --docsearch-hit-shadow: unset;
  --docsearch-icon-color: rgba(255, 255, 255, .5);
  --docsearch-key-gradient: linear-gradient(-225deg, #666, #999);
  --docsearch-key-shadow: inset 0 -2px 0 0 #aaa, inset 0 0 1px 1px #aaa, 0 1px 2px 1px #{$navy};
  --docsearch-logo-color: #{$brand-color};
  --docsearch-modal-background: #{$navy};
  --docsearch-modal-shadow: inset 1px 1px 0 0 #{$navy},0 3px 8px 0 #{$grey};
  --docsearch-muted-color: rgba(255, 255, 255, .5);
  --docsearch-searchbox-background: #{$grey};
  --docsearch-searchbox-focus-background: #{$grey};
  --docsearch-searchbox-shadow: inset 0 0 0 2px #{$brand-color};
  --docsearch-text-color: #f2f2f2;
}

* {
  box-sizing: border-box;
}

:focus {
  outline: $brand-color 1px solid;
}

input:focus {
  outline-offset: unset;
}

::-webkit-scrollbar {
  width: .5rem;

  &-track {
    background: rgb(10, 10, 24);
    border-left: 1px solid rgba(255,255,255,.1);
  }

  &-thumb {
    background: rgba(255, 255, 255, .4);
  }
}

html {
  height: 100%;
  font-size: 12px;
  scrollbar-color: hsla(0, 0%, 100%, .4) rgba(0, 0, 0, 0%);

  @include breakpoint($md) {
    font-size: 14px;
  }

  @include breakpoint($lg) {
    font-size: 16px;
  }
}

body {
  margin: 0;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
}

#app {
  font-family: "Poppins", "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f2f2f2;
  line-height: 1.5;
  background-color: #282828;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  > main {
    height: 100%;
    max-height: calc(100% - 6rem);
  }

  > footer {
    background: $grey;
    padding: .4em 1em;
    position: relative;
    font-size: .9em;
    flex: 0 0 auto;
    height: 2rem;
    box-shadow: 0 0 1rem rgba(0,0,0,0.2);

    svg {
      color: rgb(255, 200, 0);
    }

    a {
      text-decoration: none;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
  }
}

#nav-menu-toggle {
  background: transparent;
  color: $brand-color;
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  border: 0;

  @include breakpoint($sm) {
    display: none;
  }
}

#nav {
  padding: .5rem;
  z-index: 100;
  box-shadow: 0 0 0.5rem rgba(0,0,0,.25);
  display: flex;
  justify-content: space-between;
  position: relative;

  > div {
    display: flex;
    align-items: center;

    > span {
      opacity: .5;
      margin-left: .5rem;
    }
  }

  .logo {
    height: 3rem;
    padding: .5rem;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    color: #f2f2f2;
    text-decoration: none;
    transition: all .2s;
    font-weight: bold;

    &:hover {
      background: rgba(255,255,255,.1);
    }

    img {
      height: 100%;
      width: auto;
      margin-right: .5rem;
    }
  }

  hr {
    height: 2rem;
    margin: 0 1rem 0 .5rem;
    border-color: $brand-color;
  }

  .nav-message {
    max-width: 25rem;
    font-size: .9rem;
    line-height: 1.2;
    color: rgba(255,255,255,.66);
    transition: all .2s;

    .new {
      color: $brand-color;
    }

    img {
      height: 2rem;
      margin-right: .5rem;
    }

    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      font-size: .75rem;
    }

    &:hover {
      color: rgba(255,255,255,.8);
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 4rem;
    transition: right .2s;
    flex-direction: column;
    background: #181818;
    right: -100%;
    width: 100%;
    max-width: 24rem;
    z-index: 100;
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 1rem;

    @include breakpoint($sm) {
      flex-direction: row;
      position: relative;
      max-width: unset;
      width: auto;
      top: unset;
      right: unset;
      background: transparent;
      overflow: initial;
      overflow-y: initial;
    }

    &.active {
      right: 0;
      display: initial;
      max-height: calc(100vh - 8rem);
    }

    &.top-level:not(.active) {
      @include breakpoint($xs) {
        display: none;
      }
    }

    li {
      display: flex;
      position: relative;
      flex-direction: column;

      img {
        width: 1.5rem;
      }

      &.overlap {
        z-index: 110;
      }

      @include breakpoint($sm) {
        flex-direction: row;
      }

      &:hover {
        background: rgba(255,255,255,.1);
      }

      a, span {
        color: $brand-color;
        display: flex;
        align-items: center;
        font-weight: bold;
        padding: .5em;
        text-decoration: none;
        text-transform: uppercase;
        transition: all .2s;
        cursor: pointer;
        //width: 100%;
        font-size: 1.5rem;

        @include breakpoint($sm) {
          font-size: 1rem;

        }

        @include breakpoint($lg) {
          padding: .5em 1rem;
        }

        &.router-link-exact-active {
          color: #f2f2f2;
          border-radius: 1rem;
        }

        &.tools {
          display: none;

          @include breakpoint($sm) {
            display: flex;
          }
        }

        > svg {
          margin-right: .5rem;
          opacity: .5;
        }
      }

      .locale {
        & svg {
          margin-right: 0;
        }

        + ul {
          display: none;

          &.open {
            display: flex;
          }

          .fi { // flag icon
            width: 1.5rem;
            margin-right: .5rem;
            padding: 0;
          }

          li {
            span {
              padding: .75rem 2rem;
              line-height: 1;
            }

            &.selected {
              background: rgba(255,255,255,.1);;
            }
          }

          @include breakpoint($sm) {
            width: 28rem;
            max-height: 50vh;
            overflow-y: scroll;

            &.open {
              display: none;
            }

            li {
              span {
                padding: .5rem 1rem;
                line-height: 1;
              }
            }
          }
        }

        .locale-label {
          padding: 0rem .75rem;

          @include breakpoint($sm) {
            display: none;
          }
        }
      }

      &:not(:first-child) {
        a, span {
          &.router-link-active {
            color: #f2f2f2;
          }
        }
      }

      > ul {
        position: relative;
        top: unset;
        bottom: unset;
        right: unset;

        @include breakpoint($sm) {
          display: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          flex-direction: column;
          min-width: 100%;
          background: $grey;
          z-index: 100;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);

          li {
            &:hover {
              background: rgba(255,255,255,.1);
            }
          }

          a {
            width: 100%;
          }
        }
      }

      @include breakpoint($sm) {
        &:hover {
          ul {
            display: flex;
          }
        }
      }

      &.external {
        svg {
          margin-right: 0;

          @include breakpoint($sm) {
            opacity: 1;
          }
        }

        a {
          padding: 0 .5rem;

          @include breakpoint($sm) {

            font-size: 1.5rem;
          }

          @include breakpoint($lg) {
            padding: .5rem 1rem;
          }

          &.github {
            color: #f2f2f2;
          }

          &.discord {
            color: #5865F2;
          }

          span {
            color: inherit;
            padding-left: .5rem;

            @include breakpoint($sm) {
              display: none;
            }
          }
        }
      }

      &.search-container {
        all: unset;
        display: flex;
        align-items: center;
        margin-right: .5rem;
      }
    }
  }
}

.vdp-datepicker {
  .vdp-datepicker__calendar {
    background: $grey;
    border: 0;
    box-shadow: 0 0 1em rgba(0,0,0,.2);

    header {
      span {
        &.prev {
          &:after {
            border-right-color: #f2f2f2;
          }
        }

        &.next {
          &:after {
            border-left-color: #f2f2f2;
          }
        }

        &:not(.disabled):hover {
          background: rgba(255,255,255,.2);
        }
      }
    }

    .cell {
      &:not(.blank):not(.day-header) {
        &:not(.disabled) {
          &:hover {
            border-color: $brand-color;
          }
        }
      }

      &.selected {
        background: $brand-color;
      }
    }

    .disabled {
      opacity: .3;
    }
  }
}

.DocSearch-Button {
  padding: 0;
  border-radius: 0;
  font-family: inherit;
}

.DocSearch-Modal {
  border-radius: 0;
  font-family: "Source Sans Pro", sans-serif;
}

.DocSearch-Input:focus {
  outline: none;
}

.DocSearch-Logo svg .cls-1,
.DocSearch-Logo svg .cls-2 {
  fill: var(--docsearch-logo-color);
}

.DocSearch-Hits,
.DocSearch-Hit[aria-selected=true] {
  mark {
    color: var(--docsearch-logo-color)!important;
  }
}

.DocSearch-Footer {
  border-radius: 0;
}
</style>
