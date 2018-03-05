import CalculatorKeyboard.Companion.DEFAULT_INPUT
import kotlin.js.json

fun main(args: Array<String>) {

    val express = require("express")
    val parser = require("body-parser")
    val axios = require("axios")

    val app = express()

    app.use(parser.json())
    app.use(parser.urlencoded(json("extended" to true)))

    val port = process.env.PORT ?: 3000

    val instanceController = InstanceController()

    app.post("/new-message") { req, res ->
        val body = req.body

        asMessage(body.message)?.takeIf { it.text.contains("/start") }?.let {
            println("Message ${it.text} received from: ${it.fromUser.firstName}")

            instanceController.incomingMessage(it)

            axios.post(
                Api.forEndpoint("sendMessage"),
                json(
                    "chat_id" to it.chat.id,
                    "text" to DEFAULT_INPUT,
                    "reply_markup" to keyboard.toJson()
                )
            ).then { response ->
                val messageId = response.data.result.message_id as Int
                val success = instanceController.setMessageIdFor(it.fromUser, messageId)

                println("Message posted with id $messageId from: ${it.fromUser.firstName}")

                res.end(
                    if (success)
                        "ok"
                    else
                        "error"
                )
            }.catch { err -> res.end("Error : $err") }
        } ?: asCallbackQuery(body.callback_query)?.let {
            println("callback received from ${it.from.firstName}, data ${it.data}, message text ${it.message.text}")

            instanceController.incomingCallback(it)?.let { instance ->
                axios.post(
                    Api.forEndpoint("editMessageText"),
                    json(
                        "chat_id" to instance.chat.id,
                        "message_id" to instance.messageId,
                        "text" to "fixed text"/*instance.processor.process(it.data.removePrefix("data")).also {
                            println("callback text $it")
                        }*/,
                        "reply_markup" to keyboard.toJson()
                    )
                ).then { _ ->
                    println("Callback posted")
                    res.end("ok")
                }.catch { err -> res.end("Error : $err") }
            }

            res.end("ok")
        }

        res.end("ok")
    }

    app.listen(port) {
        println("Telegram calculator bot listening on port $port")
    }
}