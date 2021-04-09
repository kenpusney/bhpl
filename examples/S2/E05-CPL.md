# CPL

## Fact 阶乘

```cpl
rec function Fact[x] = (x = 0) -> 1, xFact[x — 1]
```

## Fact2 循环版阶乘

```cpl
function Fact2[x] = result of
    §   real f = 1
        until x = 0 do
            f, x := xf, x — 1
        result := f §
```

## 欧拉算法

```cpl
function Euler [function Fct, real Eps; integer Tim]= result of
    §1  dec §1.1    real Mn, Ds, Sum
                    integer i, t
                    index n=0
                    m = Array [real, (0, 15)] §1.1
        i, t, m[0] := 0, 0, Fct[0]
        Sum := m[0]/2
        §1.2    i := i + 1
                Mn := Fct[i]
                for k = step 0, 1, n do
                    m[k], Mn := Mn, (Mn + m[k])/2
                test Mod[Mn] < Mod[m[n]] /\ n < 15
                    then do Ds, n, m[n+l] := Mn/2, n+1, Mn
                    or do Ds := Mn
                Sum := Sum + Ds
                t := (Mod[Ds] < Eps) -> t + 1, 0 §1.2
        repeat while t < Tim
        result := Sum §1
```