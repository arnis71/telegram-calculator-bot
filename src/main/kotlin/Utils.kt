external fun require(module: String): dynamic
external val process: dynamic

fun asCallbackQuery(data: dynamic) = CallbackQuery(data).takeIf { it.id.isNotEmpty() }
fun asMessage(data: dynamic) = Message(data).takeIf { it.id != -1 }

class CallbackQuery(data: dynamic) {
    val id: String = data?.id as? String ?: ""
    val from: User = data?.from as? User ?: User(undefined)
    val message: Message = data?.message as? Message ?: Message(undefined)
    val data: String = data?.data as? String ?: ""
}

class Message(data: dynamic) {
    val id: Int = data?.message_id as? Int ?: -1
    val fromUser: User = data?.from as? User ?: User(undefined)
    val chat: Chat = data?.chat as? Chat ?: Chat(undefined)
    val text: String = data?.text as? String ?: ""
}

class User(data: dynamic) {
    val id: Int = data?.id as? Int ?: -1
    val firstName: String = data?.first_name as? String ?: ""
}

class Chat(data: dynamic) {
    val id: Int = data?.message_id as? Int ?: -1
}