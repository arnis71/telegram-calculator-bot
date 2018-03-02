import kotlin.js.json

class CalculatorKeyboard(private val rows: Int, private val cols: Int) {
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
            .plus(sequenceOf("AC", "+", "-"))
            .map { json(
                "text" to it,
                "callback_data" to "data$it"
            ) }
            .chunked(cols)
            .toList()
            .reversed()
    )
}