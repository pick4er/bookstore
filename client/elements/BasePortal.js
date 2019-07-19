import Vue from 'vue';

import isServer from 'helpers/isServer';

function createNode(id) {
  const node = document.createElement('div');
  node.setAttribute('id', id);
  return document.body.appendChild(node);
}

function destroyNode(id) {
  return document.body.removeChild(
    findNode(id),
  );
}

function findNode(id) {
  return document.getElementById(id);
}

export default {
  name: 'base-portal',
  props: {
    shouldOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      required: true,
      default: 'base',
    },
    portalClass: {
      type: [String, Object, Array],
      required: false,
    },
  },
  data() {
    return {
      portal: null,
    };
  },
  created() {
    if (this.shouldOpen && !isServer) {
      this.createPortal();
    }
  },
  watch: {
    shouldOpen(shouldOpen, prevShouldOpen) {
      if (shouldOpen && !prevShouldOpen) {
        return this.createPortal();
      }

      if (!shouldOpen && prevShouldOpen) {
        return this.destroyPortal();
      }
    },
  },
  computed: {
    portalId() {
      return `portal-${this.id}`;
    },
  },
  methods: {
    onModalClick(event) {
      return this.$emit('click', event);
    },
    onModalKeyup(event) {
      return this.$emit('keyup', event);
    },
    createPortal() {
      if (isServer) return;

      const self = this;
      createNode(self.portalId);
      self.portal = new Vue({
        name: 'base-modal',
        mounted() {
          return this.$refs.portal.focus();
        },
        render(h) {
          return h(
            'div',
            {
              class: self.portalClass,
              attrs: {
                id: self.portalId,
                tabindex: -1,
                autofocus: true,
                ...self.$attrs,
              },
              on: {
                click: self.onModalClick,
                keyup: self.onModalKeyup,
              },
              ref: 'portal',
              props: self.$props,
            },
            self.$slots.default,
          );
        },
      });

      this.portal.$mount(`#${self.portalId}`);
    },
    destroyPortal() {
      if (isServer) return;
      if (!findNode(this.portalId)) return;

      this.portal.$destroy(`#${this.portalId}`);
      destroyNode(this.portalId);
    },
  },
  render: h => h(),
};
