import { ConditionCallback, ConditionOperator } from './interface'

export const and = (condition: ConditionCallback): ConditionOperator => {
    return {
        type: 'and',
        callback: condition,
    }
}

export const or = (condition: ConditionCallback): ConditionOperator => {
    return {
        type: 'or',
        callback: condition,
    }
}
