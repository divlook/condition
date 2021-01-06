import { Condition } from './condition'

export interface ConditionCallback {
    (operators: Condition): boolean
}

export interface ConditionOperator {
    type: 'and' | 'or'
    callback: ConditionCallback
}
