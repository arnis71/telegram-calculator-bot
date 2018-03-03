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

        asMessage(body.message)?.takeIf { it.text.contains("/start") }?.apply {
            println("message received from: ${fromUser.firstName}, text: $text, chatId: ${chat.id}")

            instanceController.incomingMessage(this)

            axios.post(
                "https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage",
                json(
                    "chat_id" to chat.id,
                    "text" to Processor.DEFAULT_INPUT,
                    "reply_markup" to CalculatorKeyboard(5,3).toJson()
                )
            ).then { response ->
                val messageId = response.data.result.message_id as Int
                instanceController.setMessageIdFor(fromUser, messageId)

                println("Message posted with id $messageId, from user ${fromUser.firstName}")
                res.end("ok")
            }.catch { err ->
                    println("Error : $err")
                    res.end("Error : $err")
                }

            ""
        } ?: asCallbackQuery(body.callback_query)?.apply {
            println("callback received from ${from.firstName}, data $data, message text ${message.text}")

            instanceController.requestFromCallback(this)?.let {
                axios.post(
                    "https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/editMessageText",
                    it
                ).then { response ->
                    println("Callback posted")
                    res.end("ok")
                }.catch { err ->
                        println("Error : $err")
                        res.end("Error : $err")
                    }
            ""
            }
        }

        res.end("ok")
    }

    app.listen(port) {
        println("Telegram app listening on port $port")
    }
}