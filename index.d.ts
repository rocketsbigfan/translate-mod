import core, { Collection } from "jscodeshift"
import { GlobbyOptions } from 'globby'
 
export  type TransformConfig = {
  readonly entry?: string,
  syncOptions?: GlobbyOptions,
  coreFn: (j: core.JSCodeshift, root: Collection<any>) => string,
  successCallBack?: () => any
}


