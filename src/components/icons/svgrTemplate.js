// Ripped from
// https://www.smooth-code.com/open-source/svgr/docs/typescript/
function template({ template }, opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] })
  return typeScriptTpl.ast`
    import React, { SVGProps } from 'react';
    const ${componentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};
    export default ${componentName};
  `
}
module.exports = template
