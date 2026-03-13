window.addEventListener("message", (event) => {
  if (event.data.type === "updateArgamaColor") {
    document.documentElement.style.setProperty(
      "--argama-text-color",
      event.data.color,
    );
  }
  if (event.data.type === "updateMagazineBackgroundColor") {
    document.documentElement.style.setProperty(
      "--magazine-background-color",
      event.data.color,
    );
  }
  if (event.data.type === "updateCoverImage") {
    const coverArt = document.getElementById("cover-art");
    if (coverArt) {
      // Create SVG image element
      const newImage = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image",
      );

      // Transfer attributes from the rect to the image
      ["x", "y", "width", "height", "transform", "id"].forEach((attr) => {
        const val = coverArt.getAttribute(attr);
        if (val) newImage.setAttribute(attr, val);
      });

      newImage.setAttribute("href", event.data.imageData);
      newImage.setAttribute("preserveAspectRatio", "xMaxYMin slice");

      // Swap rect with image
      coverArt.replaceWith(newImage);
    }
  }
  if (event.data.type === "updateArtist") {
    updateArtistText(event.data.name);
  }
  if (event.data.type === "updateCharacterName") {
    updateCharacterName(event.data.name);
  }
  if (event.data.type === "updateIssueNumber") {
    const issueText = document.querySelector("#issue-text tspan") as SVGTSpanElement;
    if (issueText) {
      issueText.textContent = `Issue #${event.data.number}`;
      // x="0" ensures it stays relative to the parent's translate point
      issueText.setAttribute("x", "0"); 
    }
  }
});

function updateArtistText(newText: string) {
  const tspan = document.getElementById(
    "artist-tspan",
  ) as unknown as SVGTSpanElement;
  const rect = document.getElementById(
    "artist-bg",
  ) as unknown as SVGRectElement;
  const textContainer = document.getElementById(
    "artist-text-container",
  ) as unknown as SVGTextElement;

  if (tspan && rect && textContainer) {
    tspan.textContent = `Illustration: ${newText}`;

    // Use requestAnimationFrame to ensure the browser has calculated the new text width
    requestAnimationFrame(() => {
      const bbox = textContainer.getBBox();
      const sideMargin = 12;
      const totalWidth = bbox.width + sideMargin * 2;

      // Set the width of the box
      rect.setAttribute("width", totalWidth.toString());

      const rectBaseX = 1841;
      rect.setAttribute("x", rectBaseX.toString());
    });
  }
}

function updateCharacterName(newName: string) {
  const container = document.getElementById("character-name");
  const tspan = container?.querySelector("tspan");
  if (tspan) {
    tspan.textContent = newName;
  }
}
