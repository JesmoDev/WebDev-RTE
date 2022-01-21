import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-rich-text-editor.element'],
  bundle: 'index',
});
