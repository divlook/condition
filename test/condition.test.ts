import { Condition } from '../src/condition'

describe('Condition', () => {
    describe('기본 사용법', () => {
        it('인스턴스화가 가능합니다.', () => {
            expect(new Condition()).toBeInstanceOf(Condition)
        })

        it('파라미터에 콜백을 입력하여 조건을 등록할 수 있습니다.', () => {
            expect(() => {
                const condition = new Condition(() => true)
                condition.is.true()
            }).not.toThrow()
        })

        it('`is.true()` 메서드는 조건을 계산한 뒤 결과가 참이면 `true`를 반환합니다. ', () => {
            const condition = new Condition(() => true)

            expect(condition.is.true()).toBeTruthy()
        })
        it('`is.false()` 메서드는 조건을 계산한 뒤 결과가 거짓이면 `true`를 반환합니다. ', () => {
            const condition = new Condition(() => false)

            expect(condition.is.false()).toBeTruthy()
        })

        it('등록된 조건이 없는 상태에서 `is` 메서드를 사용하면 에러가 발생합니다.', () => {
            const condition = new Condition()

            expect(() => {
                condition.is.true()
            }).toThrow()
        })

        it('`and/or` 메서드를 사용하여 조건을 추가할 수 있습니다.', () => {
            const condition = new Condition()

            condition.and(() => false)
            condition.or(() => false)

            expect(condition.is.false()).toBeTruthy()
        })

        it('`and/or` 메서드는 체인방식으로도 사용할 수 있습니다.', () => {
            const condition = new Condition()
                .and(() => false)
                .or(() => false)

            expect(condition.is.false()).toBeTruthy()
        })

        it('`reset` 메서드를 사용하여 등록된 조건을 지울 수 있습니다.', () => {
            const condition = new Condition()
                .and(() => false)
                .or(() => false)
                .reset()

            expect(() => {
                condition.is.false()
            }).toThrow()
        })
    })

    describe('Sub Condition', () => {
        it('(true || false) && false', () => {
            const condition = new Condition()

            condition.and((sub) => {
                sub.and(() => true)
                sub.or(() => false)
                return sub.is.true()
            })

            condition.and(() => false)

            expect(condition.is.false()).toBeTruthy()
        })

        it('(false || false) && false', () => {
            const condition = new Condition()

            condition.and((sub) => {
                sub.and(() => false)
                sub.or(() => false)
                return sub.is.true()
            })

            condition.or(() => false)

            expect(condition.is.false()).toBeTruthy()
        })

        it('(false || false) || true', () => {
            const condition = new Condition()

            condition.and((sub) => {
                sub.and(() => false)
                sub.or(() => false)
                return sub.is.true()
            })

            condition.or(() => true)

            expect(condition.is.true()).toBeTruthy()
        })
    })
})
