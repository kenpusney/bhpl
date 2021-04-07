# SNOBOL

示例内容来自 [A Snobol4 Tutorial](http://www.snobol4.org/docs/burks/tutorial/contents.htm)。经验证可以使用。

SNOBOL4 编译/解释器可以在 snobol4.org 下载。

## `cat.sno` 读取标注输入输出到标准输出

```SNOBOL
        N = 0
COPY    OUTPUT = INPUT      :F(DONE)
        N = N + 1           :(COPY)
DONE    OUTPUT = 'There were ' N ' lines.'
END
```

## `ascii.sno` 转换字符的ASCII

```SNOBOL
    CHAR = 'A'
    &ALPHABET @N CHAR
    OUTPUT = N
END
```

## `triplets.sno` 格式化输出文本

```SNOBOL
        &TRIM = 1
        N = 0
LOOP    S = INPUT           :F(END)
        OUTPUT = DUPL(' ', (80 - SIZE(S))) S
        N = REMDR(N + 1, 3)
        OUTPUT = EQ(N, 0)   :(LOOP)
END
```

## `fcounts.sno` 统计文件行数和字符数

```SNOBOL
        &TRIM = 1
        CHARS = 0
NEXTL   CHARS = CHARS + SIZE(INPUT)     :F(DONE)
        LINES = LINES + 1               :(NEXTL)
DONE    OUTPUT = CHARS ' characters,'
        OUTPUT = +LINES ' lines read.'
END
```

## `words.sno` 统计文件词数

```SNOBOL
        &TRIM = 1
        WORD = "'-" '0123456789' &UCASE &LCASE
        WPAT = BREAK(WORD) SPAN(WORD)
NEXTL   LINE = INPUT    :F(DONE)
NEXTW   LINE WPAT =     :F(NEXTL)
        N = N + 1         :(NEXTW)
DONE    OUTPUT = +N ' words'
END
```

## `pattern.sno` 模式匹配实例

```SNOBOL
* Alternates and Capture
    B = 'BlueBird'
    COLOR = ('Gold' | 'Blue') . SHADE
    CRITTER = ('Fish' | 'Bird') . ANIMAL
    BOTH = COLOR CRITTER
    B BOTH
    OUTPUT = 'Shade: ' SHADE
    OUTPUT = 'Animal: ' ANIMAL
* Remainder part
    'THE WINTER WINDS' 'WIN' REM . OUTPUT
    'THE WINTER WINDS' 'WINDS' REM . OUTPUT
* Arbitrary characters
    'MOUNTAIN' 'O' ARB . OUTPUT 'A'
    'MOUNTAIN' 'O' ARB . OUTPUT 'U'
* Cursor position
    'DOUBT' @OUTPUT 'B'
    'FIX' @OUTPUT 'B'
* Length
    'ABCDA' LEN(3) . OUTPUT
    'ABCDA' LEN(2) . OUTPUT 'A'
* Position (Assertion)
    'ABCDA' POS(0) 'B'
    'ABCDA' LEN(3) . OUTPUT RPOS(0)
    'ABCDA' POS(3) LEN(1) . OUTPUT
    'ABCDA' POS(0) 'ABCD' RPOS(0)
* Position (Match)
    'ABCDA' TAB(2) . OUTPUT RTAB(1) . OUTPUT
* Character Patterns
    VOWEL = ANY('AEIOU')
    DVOWEL = VOWEL VOWEL
    NOTVOWEL = NOTANY('AEIOU')
    'VACUUM' VOWEL . OUTPUT
    'VACUUM' DVOWEL . OUTPUT
    'VACUUM' (VOWEL NOTVOWEL) . OUTPUT
* Span & Break
    LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'-"
    WORD = SPAN(LETTERS)
    GAP = BREAK(LETTERS)
    'SAMPLE LINE' WORD . OUTPUT
    'PLUS TEN DEGREES' ' ' WORD . OUTPUT
    GAPO = GAP . OUTPUT
    WORDO = WORD . OUTPUT
    ': ONE, TWO, THREE' GAPO WORDO GAPO WORDO
    DIGITS = '0123456789'
    INTEGER = (ANY('+-') | '') SPAN(DIGITS)
    'SET -43 VOLTS' INTEGER . OUTPUT
    REAL = INTEGER '.' (SPAN(DIGITS) | '')
    'SET -43.625 VOLTS' REAL . OUTPUT

    S = '0ZERO,1ONE,2TWO,3THREE,4FOUR,5FIVE,'
    S 4 BREAK(',') . OUTPUT

END
```

## `cross.sno` 综合示例：纵横字

```SNOBOL
        &TRIM = 1
AGAIN   OUTPUT = 'ENTER HORIZONTAL WORD:'
        H = INPUT                       :F(END)
        OUTPUT = 'ENTER VERTICAL WORD:'
        V = INPUT                       :F(END)
        HC = H
NEXTH   HC @NH ANY(V) . CROSS = '*'     :F(AGAIN)
        VC = V
NEXTV   VC @NV CROSS = '#'              :F(NEXTH)
        OUTPUT =
        PRINTV = V
        PRINTV POS(NV) LEN(1) = '#'

PRINT   PRINTV LEN(1) . C =             :F(NEXTV)
        OUTPUT = DIFFER(C, '#') DUPL(' ', NH) C     :S(PRINT)
        OUTPUT = H                      :(PRINT)
END
```
