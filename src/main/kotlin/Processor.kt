class Processor {
    private var firstValue = ""
    private var secondValue = ""
    private var action: CalculatorAction? = null

    fun process(input: String) : String {
        action?.let {
            secondValue += input
            return secondValue
        } ?: CalculatorAction.values().find { it.title == input }
            ?.let {
                action = it
                return calculate()
            }
        ?: kotlin.run {
            firstValue += input
            return firstValue
        }
    }

    private fun calculate() = requireNotNull(action).calculate(firstValue, secondValue)
}