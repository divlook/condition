# README

A nice conditional statement

## Install

v1.0.0 이전까지는 github 패키지 사용 예정

```bash
# npm login --scope=@divlook --registry=https://npm.pkg.github.com
# yarn npm login --scope=@divlook --registry=https://npm.pkg.github.com

npm install @divlook/ifjs
```

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
