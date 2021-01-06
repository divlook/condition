import { ConditionCallback, ConditionOperator } from './interface'
import { and, or } from './operators'

export class Condition {
    private pipe: ConditionOperator[] = []

    constructor(condition?: ConditionCallback) {
        if (condition) {
            this.pipe.push(and(condition))
        }
    }

    get is() {
        return {
            true: () => this.true(),
            false: () => this.false(),
        }
    }

    and(condition: ConditionCallback) {
        this.pipe.push(and(condition))

        return this
    }

    or(condition: ConditionCallback) {
        this.pipe.push(or(condition))

        return this
    }

    reset() {
        this.pipe.splice(0, this.pipe.length)

        return this
    }

    private true() {
        return this.execute() === true
    }

    private false() {
        return this.execute() === false
    }

    private execute() {
        let result: boolean | null = null

        if (this.pipe.length === 0) {
            throw new Error('등록된 조건이 없습니다.')
        }

        for (const operator of this.pipe) {
            const IS_AND = operator.type === 'and'
            const IS_OR = operator.type === 'or'
            const value = operator.callback(new Condition())

            if (IS_AND && result === false) {
                break
            }

            if (IS_OR && result === true) {
                break
            }

            result = value
        }

        return !!result
    }
}

export default Condition
