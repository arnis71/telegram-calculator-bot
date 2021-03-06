external fun require(module: String): dynamic
external val process: dynamic

fun asCallbackQuery(data: dynamic) = CallbackQuery(data).takeIf { it.id.isNotEmpty() }
fun asMessage(data: dynamic) = Message(data).takeIf { it.id != -1 }

class CallbackQuery(data: dynamic) {
    val id: String = data?.id as? String ?: ""
    val from = User(data?.from)
    val message = Message(data?.message)
    val data: String = data?.data as? String ?: ""
        get() = field.removePrefix(PREFIX)

    companion object {
        const val PREFIX = "data"
    }
}

class Message(data: dynamic) {
    val id: Int = data?.message_id as? Int ?: -1
    val fromUser = User(data?.from)
    val chat = Chat(data?.chat)
    val text: String = data?.text as? String ?: ""
}

class User(data: dynamic) {
    val id: Int = data?.id as? Int ?: -1
    val firstName: String = data?.first_name as? String ?: ""
}

class Chat(data: dynamic) {
    val id: Int = data?.id as? Int ?: -1
}

object Api {
    private const val BASE_URL = "https://api.telegram.org/"
    private const val KEY = "518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4"

    fun getUrl(path: String) = "${BASE_URL}bot$KEY/$path"
}