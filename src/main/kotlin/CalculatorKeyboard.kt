import kotlin.js.json

class CalculatorKeyboard(private val rows: Int = 5, private val cols: Int = 3) {
    private val numbers = generateSequence(1) {
        it + 1
    }

    fun toJson() = json(
        "inline_keyboard" to sequenceOf(-1, 0, -1)
            .plus(numbers.take((rows - 2) * cols))
            .map {
                if (it == -1)
                    ""
                else
                    it.toString()
            }
            .plus(sequenceOf(RESET, ADD, SUB))
            .map { json(
                "text" to it,
                "callback_data" to "data$it"
            ) }
            .chunked(cols)
            .toList()
            .reversed()
    )

    companion object {
        const val DEFAULT_INPUT = "0"
        const val RESET = "AC"
        const val ADD = "+"
        const val SUB = "-"
    }
}

val keyboard: CalculatorKeyboard
    get() = CalculatorKeyboard()