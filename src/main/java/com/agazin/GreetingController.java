package com.agazin;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


	@MessageMapping("/chat")
	@SendTo("/topic/chatings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		System.out.println(message.getName() + " -> " + (message.getMessage()));
		return new Greeting(HtmlUtils.htmlEscape(message.getName()) + ", " + HtmlUtils.htmlEscape(message.getMessage()) + "!");
	}

}
