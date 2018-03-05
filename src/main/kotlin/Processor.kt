import CalculatorKeyboard.Companion.DEFAULT_INPUT

class Processor {
    private var firstValue = DEFAULT_INPUT
    private var secondValue = DEFAULT_INPUT
    private var action: CalculatorAction? = null

    fun process(input: String) : String {
        CalculatorAction.values().find { it.title == input }
            ?.let {
                action = it
                return calculate(it.title)
            }
        ?: action?.let {
            secondValue += input
            return secondValue.removePrefix("0")
        } ?: run {
            firstValue += input
            return firstValue.removePrefix("0")
        }
    }

    fun calculate(actionTitle: String): String {
        println("calculating $firstValue $actionTitle $secondValue")
        return when (actionTitle) {
            CalculatorAction.RESET.title -> {
                DEFAULT_INPUT.also {
                    firstValue = it
                    secondValue = it
                }
            }
            CalculatorAction.ADD.title -> (firstValue.toInt() + secondValue.toInt()).toString().also {
                firstValue = it
                secondValue = DEFAULT_INPUT
            }
            CalculatorAction.SUB.title -> (firstValue.toInt() - secondValue.toInt()).toString().also {
                firstValue = it
                secondValue = DEFAULT_INPUT
            }
            else -> DEFAULT_INPUT
        }
    }
}