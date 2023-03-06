/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        REACT_APP_ENV: 'development' | 'master' | 'alpha' | 'prod'
        NODE_ENV: 'development' | 'production'
      }
    }
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  const src: string
  export default src
}

/* CSS MODULES */
declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

//可以避免写 .module.scss 后缀 .scss后缀就行 // 不管用，删掉吧
declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

interface String {
  toBase64(): string
  convertToTenRadix(radix?: number): string
  priceToLocalString(): string
}
