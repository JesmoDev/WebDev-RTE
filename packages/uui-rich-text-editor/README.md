# uui-rich-text-editor

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-rich-text-editor?logoColor=%231B264F)

Umbraco style rich-text-editor component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-rich-text-editor
```

Import the registration of `<uui-rich-text-editor>` via:

```javascript
import '@umbraco-ui/uui-rich-text-editor/lib';
```

When looking to leverage the `UUIRichTextEditorElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIRichTextEditorElement } from '@umbraco-ui/uui-rich-text-editor/lib/uui-rich-text-editor.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-rich-text-editor@latest/dist/uui-rich-text-editor.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-rich-text-editor@X.X.X/dist/uui-rich-text-editor.min.js"></script>
```

## Usage

```html
<uui-rich-text-editor></uui-rich-text-editor>
```
