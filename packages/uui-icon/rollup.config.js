import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-icon.element', 'UUIIconRequestEvent'],
  bundle: 'index',
});