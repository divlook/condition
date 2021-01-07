# README

![Auto Release](https://github.com/divlook/ifjs/workflows/Auto%20Release/badge.svg)
![CI](https://github.com/divlook/ifjs/workflows/CI/badge.svg)

A nice conditional statement

## Install

v1.0.0 이전까지는 github 패키지 사용 예정

```bash
# npm login --scope=@divlook --registry=https://npm.pkg.github.com
npm install @divlook/ifjs

# yarn npm login --scope=@divlook --registry=https://npm.pkg.github.com
yarn add @divlook/ifjs
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

condition.and(() => false)

await condition.is.false()
```

### Async

```ts
import { Condition } from '@divlook/ifjs'

const condition = new Condition(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 2000)
    })
})

await condition.is.true()
```

## Command

```bash
# 빌드
yarn run build

# 파일이 변경될 때마다 빌드 실행
yarn run start

# 테스트
yarn run test

# 파일이 변경될 때마다 테스트
yarn run test:watch

# github package에 배포
yarn run pkg:github
```
