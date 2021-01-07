import { Condition } from '../src/condition'

describe('Condition', () => {
    describe('기본 사용법', () => {
        it('인스턴스화가 가능합니다.', () => {
            expect(new Condition()).toBeInstanceOf(Condition)
        })

        it('파라미터에 콜백을 입력하여 조건을 등록할 수 있습니다.', () => {
            expect(async () => {
                const condition = new Condition(() => true)
                await condition.is.true()
            }).not.toThrow()
        })

        it('`is.true()` 메서드는 조건을 계산한 뒤 결과가 참이면 `true`를 반환합니다. ', async () => {
            const condition = new Condition(() => true)

            expect(await condition.is.true()).toBeTruthy()
        })
        it('`is.false()` 메서드는 조건을 계산한 뒤 결과가 거짓이면 `true`를 반환합니다. ', async () => {
            const condition = new Condition(() => false)

            expect(await condition.is.false()).toBeTruthy()
        })

        it('등록된 조건이 없는 상태에서 `is` 메서드를 사용하면 에러가 발생합니다.', () => {
            const condition = new Condition()

            expect(condition.is.true()).rejects.toBeDefined()
        })

        it('`and/or` 메서드를 사용하여 조건을 추가할 수 있습니다.', async () => {
            const condition = new Condition()

            condition.and(() => false)
            condition.or(() => false)

            expect(await condition.is.false()).toBeTruthy()
        })

        it('`and/or` 메서드는 체인방식으로도 사용할 수 있습니다.', async () => {
            const condition = new Condition().and(() => false).or(() => false)

            expect(await condition.is.false()).toBeTruthy()
        })

        it('`reset` 메서드를 사용하여 등록된 조건을 지울 수 있습니다.', () => {
            const condition = new Condition()
                .and(() => false)
                .or(() => false)
                .reset()

            expect(condition.is.false()).rejects.toBeDefined()
        })
    })

    describe('Sub Condition', () => {
        it('(true || false) && false', async () => {
            const condition = new Condition()

            condition.and((sub) => {
                return sub(() => true)
                    .or(() => false)
                    .is.true()
            })

            condition.and(() => false)

            expect(await condition.is.false()).toBeTruthy()
        })

        it('(false || false) && false', async () => {
            const condition = new Condition()

            condition.and((sub) => {
                return sub()
                    .and(() => false)
                    .or(() => false)
                    .is.true()
            })

            condition.or(() => false)

            expect(await condition.is.false()).toBeTruthy()
        })

        it('(false || false) || true', async () => {
            const condition = new Condition()

            condition.and((sub) => {
                return sub(() => false)
                    .or(() => false)
                    .is.true()
            })

            condition.or(() => true)

            expect(await condition.is.true()).toBeTruthy()
        })
    })

    describe('Async', () => {
        it('Promise', async () => {
            const condition = new Condition((sub) => {
                return sub()
                    .and(() => true)
                    .and(() => Promise.resolve(true))
                    .and(
                        () =>
                            new Promise((resolve) => {
                                setTimeout(() => resolve(true), 1000)
                            })
                    )
                    .is.true()
            })

            expect(await condition.is.true()).toBeTruthy()
        })
    })
})
