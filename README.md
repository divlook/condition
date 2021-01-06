# README

A nice conditional statement

## Usage

### Default

```ts
import { Condition } from '@divlook/ifjs'

const condition = new Condition()

condition.and(() => false)
condition.or(() => false)

await condition.is.false() // true
```

### Chaining

```ts
import { Condition } from '@divlook/ifjs'

await new Condition(() => true)
    .and(() => 0 === '0')
    .or(() => 1 === 2)
    .is.true() // false
})
```

### Sub Condition

```ts
import { Condition } from '@divlook/ifjs'

const condition = new Condition()
    .and(sub => {
        const subCondition = sub()
        return subCondition
            .and(() => false)
            .or(() => false)
            .is.true()
    })
    .or(sub => {
        return sub(() => true)
            .or(() => false)
            .is.true()
    })
})

condition.and(() => false)

await condition.is.false()
```
