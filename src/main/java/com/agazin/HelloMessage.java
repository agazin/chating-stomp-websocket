package com.agazin;

public class HelloMessage {

	private String name;
	private String message;

	public HelloMessage() {
	}

	public HelloMessage(String message) {
		this.message = message;
	}
	
	public HelloMessage(String name , String message) {
		this.name = name;
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public String getName() {
		return name;
	}
	
}
