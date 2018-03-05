class Processor {
    private var firstValue = CalculatorKeyboard.DEFAULT_INPUT
    private var secondValue = CalculatorKeyboard.DEFAULT_INPUT
    private var action: CalculatorAction? = null

    fun process(input: String) : String {
        CalculatorAction.values().find { it.title == input }
            ?.let {
                action = it
                return calculate()
            }
        ?: action?.let {
            secondValue += input
            return secondValue.removePrefix("0")
        } ?: run {
            firstValue += input
            return firstValue.removePrefix("0")
        }
    }

    private fun calculate() = requireNotNull(action).calculate(firstValue, secondValue)
}