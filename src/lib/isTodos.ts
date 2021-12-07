import type { Todos } from './Todos';

const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
type ArrayCheckOption = 'all' | 'first';
const isArray = <T>(
  childCheckFn:
    | ((value: unknown) => value is T)
    | ((value: unknown) => boolean),
  checkOption: ArrayCheckOption = 'all'
) => (array: unknown): boolean =>
  Array.isArray(array) &&
  (checkOption === 'all'
    ? ((array) => {
        for (const val of array) {
          if (!childCheckFn(val)) return false
        }
        return true;
      })(array)
    : typeof array[0] === "undefined" || childCheckFn(array[0]));
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isUnion = (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false)

export const isTodos = (arg_0: unknown, checkOpt: ArrayCheckOption = 'all'): arg_0 is Todos => isArray((arg_1: unknown): boolean => isObject(arg_1) &&
  ('value' in arg_1 && (isString)(arg_1['value'])) && ('id' in arg_1 && (isNumber)(arg_1['id'])) && ('checked' in arg_1 && ((arg_2: unknown): boolean => isUnion([(arg_3: unknown): boolean => arg_3 === false, (arg_3: unknown): boolean => arg_3 === true])(arg_2))(arg_1['checked'])) && ('removed' in arg_1 && ((arg_2: unknown): boolean => isUnion([(arg_3: unknown): boolean => arg_3 === false, (arg_3: unknown): boolean => arg_3 === true])(arg_2))(arg_1['removed'])), checkOpt)(arg_0);