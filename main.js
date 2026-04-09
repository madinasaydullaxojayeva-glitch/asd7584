const textInput = document.getElementById("text");
const voiceSelect = document.getElementById("voiceSelect");

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();

  if (voices.length === 0) {
    setTimeout(loadVoices, 100);
    return;
  }

  voiceSelect.innerHTML = "";

  // 🔥 FAKE Uzbek qo‘shamiz
  const uzOption = document.createElement("option");
  uzOption.value = "uzbek";
  uzOption.textContent = "O'zbek (uz-UZ)";
  voiceSelect.appendChild(uzOption);

  // qolganlarini qo‘shamiz
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = voice.name + " (" + voice.lang + ")";
    voiceSelect.appendChild(option);
  });
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

function speakText() {
  const text = textInput.value;

  if (!text) {
    alert("Matn yoz!");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  if (voiceSelect.value === "uzbek") {
    // 🔥 Uzbek uchun eng yaqin ovoz
    let voice =
      voices.find(v => v.lang.includes("tr")) || // turk
      voices.find(v => v.lang.includes("ru")) || // rus
      voices[0];

    utterance.voice = voice;
  } else {
    utterance.voice = voices[voiceSelect.value];
  }

  speechSynthesis.speak(utterance);
}