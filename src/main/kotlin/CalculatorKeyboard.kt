import kotlin.js.json

class CalculatorKeyboard(private val rows: Int, private val cols: Int) {
    private val numbers = generateSequence(1) {
        it + 1
    }

    fun toJson() = json(
        "keyboard" to numbers.take((rows - 1) * cols)
            .map(Int::toString)
            .plus(sequenceOf("AC", "+", "-"))
            .map { json("text" to it) }
            .windowed(cols)
            .toList()
            .reversed()
    )
}