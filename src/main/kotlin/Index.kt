import CalculatorKeyboard.Companion.DEFAULT_INPUT
import kotlin.js.json

fun main(args: Array<String>) {
    val express = require("express")
    val parser = require("body-parser")
    val axios = require("axios")

    val app = express()

    app.use(parser.json())
    app.use(parser.urlencoded(json("extended" to true)))

    val instanceController = InstanceController()

    app.post("/new-message") { req, res ->

        asMessage(req.body.message)?.takeIf { it.text == "/start" }?.let {

            instanceController.incomingMessage(it)

            axios.post(
                Api.getUrl("sendMessage"),
                json(
                    "chat_id" to it.chat.id,
                    "text" to DEFAULT_INPUT,
                    "reply_markup" to keyboard.toJson()
                )
            ).then { response ->
                val messageId = response.data.result.message_id as Int
                val success = instanceController.setMessageIdFor(it.fromUser, messageId)

                res.end(if (success) "ok" else "error")
            }.catch { err -> res.end("Error : $err") }

        } ?: asCallbackQuery(req.body.callback_query)?.let {

            instanceController.incomingCallback(it)?.let { instance ->
                val newText = instance.processor.process(it.data)

                if (newText != it.message.text) {
                    return@post axios.post(
                        Api.getUrl("editMessageText"),
                        json(
                            "chat_id" to instance.chat.id,
                            "message_id" to instance.messageId,
                            "text" to newText,
                            "reply_markup" to keyboard.toJson()
                        )
                    ).then { _ -> res.end("ok") }
                    .catch { err -> res.end("Error : $err") }
                }
            }

            axios.post(Api.getUrl("answerCallbackQuery"), json("callback_query_id" to it.id))
                .then { _ -> res.end("ok") }
                .catch { err -> res.end("Error : $err") }
        }
        res.end("ok")
    }

    app.listen(process.env.PORT ?: 3000)
}