import { Condition } from './condition'

export interface ConditionCallback {
    (sub: (condition?: ConditionCallback) => Condition): boolean
}

export interface ConditionOperator {
    type: 'and' | 'or'
    callback: ConditionCallback
}
