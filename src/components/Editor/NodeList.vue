<template>
<div class="node-list">
  <h2 v-html="$tc('editor.nodes.permissionsCount', nodes.length)" />

  <div class="node-list-header">
    <div class="sorting-tabs">
      <div
        :class="{ 'node-select-all': true, 'selected': allSelected }"
        @click="selectAll"
        :title="$t('editor.nodes.selectAll')"
      >
        <span></span>
      </div>

      <div
        class="permission"
        :class="{'active': sort.method === 'key'}"
        @click="changeSort('key')"
        :title="$t('editor.nodes.sort.permission')"
      >
        {{ $t('editor.permissions') }}
        <font-awesome
          v-if="sort.method === 'key'"
          :class="{'reverse': !sort.desc}"
          icon="chevron-circle-down"
        />
      </div>

      <div
        class="value"
        :class="{'active': sort.method === 'value'}"
        @click="changeSort('value')"
        :title="$t('editor.nodes.sort.value')"
      >
        {{ $t('editor.value') }}
        <font-awesome
          v-if="sort.method === 'value'"
          :class="{'reverse': !sort.desc}"
          icon="chevron-circle-down"
        />
      </div>

      <div
        class="expiry"
        :class="{'active': sort.method === 'expiry'}"
        @click="changeSort('expiry')"
        :title="$t('editor.nodes.sort.expiry')"
      >
        {{ $t('editor.expiry') }}
        <font-awesome
          v-if="sort.method === 'expiry'"
          :class="{'reverse': !sort.desc}"
          icon="chevron-circle-down" />
      </div>

      <div
        class="context"
        :class="{'active': sort.method === 'contexts'}"
        @click="changeSort('contexts')"
        :title="$t('editor.nodes.sort.contexts')"
      >
        {{ $t('editor.contexts') }}
        <font-awesome
          v-if="sort.method === 'contexts'"
          :class="{'reverse': !sort.desc}"
          icon="chevron-circle-down"
        />
      </div>

      <div class="delete-column"></div>
    </div>
  </div>

  <virtual-list
    :data-sources="sortedNodes"
    data-key="id"
    :data-component="Node"
    :keeps="50"
    class="node-list-scroll"
    :estimate-size="42"
  />
</div>
</template>

<script>
import sortBy from 'lodash.sortby';
import VirtualList from 'vue-virtual-scroll-list';
import Node from './Node.vue';

export default {
  name: 'NodeList',
  components: {
    VirtualList,
  },
  props: {
    nodes: Array,
  },
  data() {
    return {
      sort: {
        method: null,
        desc: true,
      },
    };
  },
  computed: {
    Node() { return Node; },
    sortedNodes() {
      let sorted;
      if (['key', 'value', 'expiry'].indexOf(this.sort.method) >= 0) {
        sorted = sortBy(this.nodes, [this.sort.method]);
      } else {
        sorted = sortBy(this.nodes, node => node.context[this.sort.method]);
      }

      if (this.sort.desc) {
        return sorted;
      }
      return sorted.reverse();
    },
    selectedNodes() {
      return this.$store.getters.selectedNodeIds;
    },
    currentSelectedNodes() {
      const map = this.nodes.map(node => node.id);

      return this.selectedNodes.filter(nodeId => map.indexOf(nodeId) !== -1);
    },
    allSelected() {
      return this.nodes.length && this.nodes.length === this.currentSelectedNodes.length;
    },
  },
  methods: {
    changeSort(method) {
      if (this.sort.method === method) {
        this.sort.desc = !this.sort.desc;
      } else {
        this.sort.desc = true;
      }

      this.sort.method = method;
    },
    selectAll() {
      if (this.allSelected) {
        this.$store.commit('deselectAllSessionNodes', this.nodes);
      } else {
        this.$store.commit('selectAllSessionNodes', this.nodes);
      }
    },
  },
};
</script>

<style lang="scss">
.node-list {
  background-color: #282828;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  h2 {
    font-size: 1.25rem;
    margin: 0 0 .5rem;
    padding: .5rem 1rem 0;

    span {
      margin-left: .5em;
      opacity: .5;
    }
  }

  .node-list-header {
    //background-color: rgb(67,67,78);
    border-bottom: 2px solid $brand-color;
    position: sticky;
    top: 0;
    z-index: 10;

    .sorting-tabs {
      display: flex;

      > div {
        padding: .5em 1em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;

        &.active {
          background: rgba(255,255,255,.1);
        }

        &.node-select-all {
          flex: 0 0 auto;

          span {
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            border: 2px solid $grey;
            position: relative;
          }

          &.selected {
            span {
              &:after {
                position: absolute;
                display: block;
                content: '';
                width: 1rem;
                height: .5rem;
                border: 4px solid $brand-color;
                border-top: 0;
                border-right: 0;
                transform: rotate(-45deg);
              }
            }
          }
        }

        &.delete-column {
          pointer-events: none;
          flex: 0 0 3rem;
          margin-right: .5rem;
        }

        svg {
          opacity: .5;
          transition: transform .3s;

          &.reverse {
            transform: rotate(180deg);
          }
        }

        &:hover {
          background: rgba(255,255,255,0.2);
        }

        &.permission {
          flex: 2 2 30%;
        }

        &.value {
          flex: 1 1 10%;
        }

        &.expiry {
          flex: 1 1 15%;
        }

        &.context {
          flex: 1 1 20%;
        }
      }
    }
  }

  > ul {
    margin: 0;
    padding: 0;
    padding-bottom: 8em;
    list-style: none;
  }

  // TODO: figure out if it's possible to use transitions with virtual scroller
  //&-enter, &-leave-to {
  //  opacity: 0;
  //  transform: translateX(10%);
  //}

  //&-leave-active {
  //  position: absolute;
  //  background: $red;
  //  width: 100%;
  //  pointer-events: none;
  //}
  .node-list-scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1;
  }
}
</style>
