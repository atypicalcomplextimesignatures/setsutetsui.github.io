import Picker from "vanilla-picker";

const iframe = document.getElementById("magazine-frame") as HTMLIFrameElement;

const magazineBackgroundColorPicker = document.querySelector(
  "#magazine-background-color-picker",
);
const magazineBackgroundColorPickerObject = new Picker({
  parent: magazineBackgroundColorPicker as HTMLElement,
  color: "#a8ffc8",
  alpha: false,
  onChange: (color) => {
    if (magazineBackgroundColorPicker) {
      magazineBackgroundColorPicker.style.setProperty(
        "--magazine-background-color",
        color.hex,
      );
    }
    iframe.contentWindow?.postMessage(
      { type: "updateMagazineBackgroundColor", color: color.hex },
      "*",
    );
  },
});

const argamaColorPicker = document.querySelector("#argama-color-picker");
const argamaColorPickerObject = new Picker({
  parent: argamaColorPicker as HTMLElement,
  color: "#a8c8ff",
  alpha: false,
  onChange: (color) => {
    if (argamaColorPicker) {
      argamaColorPicker.style.setProperty("--argama-text-color", color.hex);
    }
    iframe.contentWindow?.postMessage(
      { type: "updateArgamaColor", color: color.hex },
      "*",
    );
  },
});

const coverImageInput = document.getElementById(
  "cover-image",
) as HTMLInputElement;
coverImageInput?.addEventListener("change", (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      iframe.contentWindow?.postMessage(
        { type: "updateCoverImage", imageData: imageData },
        "*",
      );
    };
    reader.readAsDataURL(file);
  }
});

const artistInput = document.getElementById("artist-input") as HTMLInputElement;
artistInput?.addEventListener("input", (e) => {
  const artistName = (e.target as HTMLInputElement).value;
  iframe.contentWindow?.postMessage(
    { type: "updateArtist", name: artistName },
    "*",
  );
});

const characterNameInput = document.getElementById(
  "character-name-input",
) as HTMLInputElement;
characterNameInput?.addEventListener("input", (e) => {
  const name = (e.target as HTMLInputElement).value;
  iframe.contentWindow?.postMessage({ type: "updateCharacterName", name }, "*");
});

const issueNumberInput = document.getElementById("issue-number-input") as HTMLInputElement;
issueNumberInput?.addEventListener("input", (e) => {
  const num = (e.target as HTMLInputElement).value;
  iframe.contentWindow?.postMessage({ type: "updateIssueNumber", number: num }, "*");
})