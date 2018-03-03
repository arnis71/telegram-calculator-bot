import kotlin.js.Json
import kotlin.js.json

data class Instance(val user: User, val chat: Chat, var messageId: Int = -1)

class InstanceController {
    private val instances: ArrayList<Instance> = arrayListOf()

    fun incomingMessage(message: Message) {
        instances.removeAll { it.user.id == message.fromUser.id }
        instances.add(Instance(message.fromUser, message.chat))
    }

    fun requestFromCallback(callbackQuery: CallbackQuery): Json {
        return instances.find { it.user.id == callbackQuery.from.id }!!.let {
            json(
                "chat_id" to it.chat.id,
                "message_id" to it.messageId,
                "text" to callbackQuery.message.text + callbackQuery.data.removePrefix("data"),
                "reply_markup" to CalculatorKeyboard(5,3).toJson()
            )
        }
    }

    fun setMessageIdFor(user: User, messageId: Int) {
        instances.find { it.user.id == user.id }!!.messageId = messageId
    }
}