import kotlin.js.json

fun main(args: Array<String>) {

    val express = require("express")
    val parser = require("body-parser")
    val axios = require("axios")

    val app = express()

    app.use(parser.json())
    app.use(parser.urlencoded(json("extended" to true)))

    app.post("/new-message") { req, res ->
        println("message received")
        val message = req.body.message

        if (!message.text.toString().contains("marco", true)) {
            return@post res.end()
        }
        axios.post("https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage",
            json(
                "chat_id" to message.chat.id,
                "text" to "Polo!!"
            )
        ).then { _ ->
            println("Message posted")
            res.end("ok")
        }.catch { err ->
            println("Error : $err")
            res.end("Error : $err")
        }
    }

    app.listen(3000) {
        println("Telegram app listening on port 3000!")
    }
}