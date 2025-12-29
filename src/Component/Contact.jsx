import React from "react";

export default function Contact() {
  return (
    <div className="p-16 flex flex-col gap-6 items-start">
      <h1 className="font-bold text-3xl text-left">Get in Touch</h1>
      <p className="text-gray-500 text-xl">Have questions or need help? We're here to support your financial journey.</p>
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <img src="./assets/call.png" className="size-8" alt="phone" />
          <div className="flex flex-col">
            <span className="font-semibold">Phone:</span>
            <span className="text-gray-500">+1 (555) 123-4567</span>
          </div>
        </div>
        <div className="flex gap-2">
          <img src="./assets/mail.png" className="size-8" alt="mail" />
          <div className="flex flex-col">
            <span className="font-semibold">Email:</span>
            <span className="text-gray-500">support@fintrack.com</span>
          </div>
        </div>
        <div className="flex gap-2">
          <img src="./assets/chat.png" className="size-8" alt="chat" />
          <div className="flex flex-col">
            <span className="font-semibold">Chat:</span>
            <span className="text-gray-500">Available Mon-Fri, 9am-5pm GMT</span>
          </div>
        </div>
      </div>
      <form className="flex flex-wrap gap-4 w-1/2 mt-6 border border-gray-300 shadow-md p-6 rounded-md">
        <h1 className="font-bold text-xl w-full">Send us a Message</h1>
        <p className="text-gray-500 w-full">We'll get back to you as soon as possible.</p>
        <label className="flex flex-col gap-2 w-[calc(50%-16px)]">
          Name
          <input type="text" className="border border-gray-300 p-2 rounded-md" placeholder="Your Name" />
        </label>
        <label className="flex flex-col gap-2 w-[calc(50%-16px)]">
          Email
          <input type="email" className="border border-gray-300 p-2 rounded-md" placeholder="mr@example.com" />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Subject
          <input type="text" className="border border-gray-300 p-2 rounded-md" placeholder="How can we help you?" />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Message
          <textarea className="border border-gray-300 p-2 rounded-md" placeholder="Type your message here..." />
        </label>
        <button type="submit" className="bg-black text-white rounded-md px-6 py-3 hover:bg-gray-800 hover:cursor-pointer w-full">
          Send Message
        </button>
      </form>
    </div>
  );
}
