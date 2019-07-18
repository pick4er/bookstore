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
    createPortal() {
      if (isServer) return;

      const self = this;
      createNode(self.portalId);
      self.portal = new Vue({
        name: 'base-modal',
        render(h) {
          return h(
            'div',
            {
              class: self.portalClass,
              attrs: {
                id: self.portalId,
                ...self.$attrs,
              },
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
