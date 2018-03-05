import CalculatorKeyboard.Companion.ADD
import CalculatorKeyboard.Companion.DEFAULT_INPUT
import CalculatorKeyboard.Companion.RESET
import CalculatorKeyboard.Companion.SUB

class Processor {
    private var firstValue = DEFAULT_INPUT
    private var secondValue = DEFAULT_INPUT
    private var action: String? = null

    fun process(input: String) : String {
        val out =  input.takeIf { it == ADD || it == SUB || it == RESET }
            ?.let {
                action = it
                calculate(it)
            } ?: action?.let {
                secondValue += input
            secondValue
            } ?: run {
                firstValue += input
            firstValue
            }

        return if (out.length > 1 && out.startsWith(DEFAULT_INPUT))
            out.substring(DEFAULT_INPUT.length)
        else
            out
    }

    private fun calculate(actionTitle: String): String {
        return when (actionTitle) {
            RESET -> DEFAULT_INPUT.also {
                firstValue = it
                secondValue = it
            }
            ADD -> (firstValue.toInt() + secondValue.toInt()).toString().also {
                firstValue = it
                secondValue = DEFAULT_INPUT
            }
            SUB -> (firstValue.toInt() - secondValue.toInt()).toString().also {
                firstValue = it
                secondValue = DEFAULT_INPUT
            }
            else -> DEFAULT_INPUT
        }
    }
}