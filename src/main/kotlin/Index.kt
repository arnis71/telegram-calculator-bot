import kotlin.js.json

fun main(args: Array<String>) {

    val express = require("express")
    val parser = require("body-parser")
    val axios = require("axios")

    val app = express()

    app.use(parser.json())
    app.use(parser.urlencoded(json("extended" to true)))

    val port = process.env.PORT ?: 3000

    app.post("/new-message") { req, res ->
        val body = req.body

        asMessage(body.message)?.takeIf { it.text.contains("/start") }?.apply {
            println("message received text: $text, chatId: ${chat.id}")

            axios.post(
                "https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage",
                json(
                    "chat_id" to chat.id,
                    "text" to "0",
                    "reply_markup" to CalculatorKeyboard(5,3).toJson()
                )
            ).then { response ->
                println("Message posted")
                res.end("ok")
            }.catch { err ->
                    println("Error : $err, desc ${err.desc}")
                    res.end("Error : $err")
                }

            ""
        } ?: asCallbackQuery(body.callback_query)?.apply {
            println("callback received $data")
        }

        res.end()
    }

    app.listen(port) {
        println("Telegram app listening on port $port!")
    }
}