data class Instance(val user: User, val chat: Chat, var messageId: Int = -1) {
    val processor: Processor = Processor()
}

class InstanceController {
    private val instances: ArrayList<Instance> = arrayListOf()

    fun incomingMessage(message: Message) {
        instances.removeAll { it.user.id == message.fromUser.id }
        instances.add(Instance(message.fromUser, message.chat))
    }

    fun incomingCallback(callbackQuery: CallbackQuery): Instance? {
        return instances.find { it.user.id == callbackQuery.from.id }
            ?.takeIf { it.messageId == callbackQuery.message.id }
    }

    fun setMessageIdFor(user: User, messageId: Int): Boolean {
        return instances.find { it.user.id == user.id }?.let {
            it.messageId = messageId
            true
        } ?: false
    }
}