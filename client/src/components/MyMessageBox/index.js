// * 动态组件编写
import { createApp, watch } from 'vue';
import MyMessageBoxComponent from './index.vue';

export default function MyMessageBox (options) {
  const messageBoxApp = createApp(MyMessageBoxComponent, options);

  showMessageBox (messageBoxApp, {
    confirm: options.confirm,
    cancel: options.cancel
  }); 
}

function showMessageBox (app, { confirm, cancel }) {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  document.body.appendChild(oFragment);

  // 显示 messageBox
  vm.setVisible(true);
  
  watch(vm.state, (state) => {
    if (!state.visible) {
      switch (state.type) {
        case 'CONFIRM': 
          typeof confirm === 'function' && confirm(vm.state.id);
          break;
        case 'CANCEL':
          typeof cancel === 'fuction' && cancel();
          break;
        default: 
          break;
      }

      hideMessageBox(app);
    }
  })
}

function hideMessageBox (app) {
  app.unmount();
}

