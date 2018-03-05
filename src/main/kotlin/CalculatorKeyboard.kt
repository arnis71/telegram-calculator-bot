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
            .plus(sequenceOf(CalculatorAction.RESET.title, CalculatorAction.ADD.title, CalculatorAction.SUB.title))
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
    }
}

enum class CalculatorAction(val title: String) {
    RESET("AC"),
    ADD("+"),
    SUB("-");

    fun calculate(firstValue: String, secondValue: String): String {
        println("calculating $firstValue $title $secondValue")
        return when (title) {
            RESET.title -> CalculatorKeyboard.DEFAULT_INPUT
            ADD.title -> (firstValue.toInt() + secondValue.toInt()).toString()
            SUB.title -> (firstValue.toInt() - secondValue.toInt()).toString()
            else -> CalculatorKeyboard.DEFAULT_INPUT
        }
    }
}