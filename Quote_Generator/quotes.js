var quotes = [
  "Grab the shovel, Harold.",
  "I like you, Maude. I like you, Harold.",
  "I haven't lived. I've died a few times.",
  "Vice, Virtue. It's best not to be too moral. You cheat yourself out of too much life. Aim above morality. If you apply that to life, then you're bound to live life fully.",
  "A lot of people enjoy being dead. But they are not dead, really. They're just backing away from life. Reach out. Take a chance. Get hurt even. But play as well as you can. Go team, go! Give me an L. Give me an I. Give me a V. Give me an E. L-I-V-E. LIVE! Otherwise, you got nothing to talk about in the locker room.",
  "Harold, everyone has the right to make an ass out of themselves. You just can't let the world judge you too much.",
  "The earth is my body, my head is in the stars.",
  "You know, at one time, I used to break into pet shops to liberate the canaries. But I decided that was an idea way before its time. Zoos are full, prisons are overflowing... oh my, how the world still dearly loves a cage.",
  "Oh, Harold... That's wonderful. Go and love some more.",
  "Dreyfus once wrote from Devil's Island that he would see the most glorious birds. Many years later in Brittany he realized they had only been seagulls... For me they will always be glorious birds.",
  "A very common neurosis, particularly in this society, whereby the male child subconsciously wishes to sleep with his mother. Of course what puzzles me, Harold, is that you want to sleep with your grandmother.",
  " I suppose you think that's very funny, Harold... Oh, dinner at eight, Harold. And do try and be a little more vivacious.",
   "Consistency is not really a human trait.",
  "Well if some people get upset because they feel they have a hold on some things, I'm just acting as a gentle reminder, here today, gone tomorrow so don't get attached to things. Now with that in mind I don't mind collecting things. I've collected quite a lot of stuff in my time. Yeah, this is all memorabilia — but it’s incidental, not integral, if you know what I mean."
];

var x = document.getElementById("quoteHere");

var buttonPress = function() {
  var randomNumber = Math.floor(Math.random() * 14);
x.textContent = quotes[randomNumber];
};

function twitterPress() {
  var quoteText = quoteHere.innerHTML;
  if (quoteText.length > 122) {
    quoteText = quoteText.slice(0, 119) + "..."
  }
  window.open("https://twitter.com/intent/tweet?text=%22"+quoteText+"%22%20%23haroldandmaude&related=AlyPilkons");
};