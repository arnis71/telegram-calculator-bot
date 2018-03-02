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
        val message = req.body.message
        println("message received ${message.text}")

        if (message?.text?.toString()?.contains("/start") == true) {
            axios.post(
                "https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage",
                json(
                    "chat_id" to message.chat.id,
                    "text" to "0",
                    "reply_markup" to CalculatorKeyboard(3,3).toJson()
                )
            ).then { _ ->
                println("Message posted")
                res.end("ok")
            }.catch { err ->
                    println("Error : $err")
                    res.end("Error : $err")
                }
        } else
            return@post res.end()
    }

    app.listen(port) {
        println("Telegram app listening on port $port!")
    }
}