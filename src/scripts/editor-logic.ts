import Picker from "vanilla-picker";

const iframe = document.getElementById("magazine-frame") as HTMLIFrameElement;

const magazineBackgroundColorPicker = document.querySelector("#magazine-background-color-picker");
const magazineBackgroundColorPickerObject = new Picker({
  parent: magazineBackgroundColorPicker as HTMLElement,
  color: "#a8ffc8",
  alpha: false,
  onChange: (color) => {
    if (magazineBackgroundColorPicker) {
      magazineBackgroundColorPicker.style.setProperty("--magazine-background-color", color.hex);
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


