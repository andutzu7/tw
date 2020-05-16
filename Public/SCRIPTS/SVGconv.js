function svgDataURL(svg) {
    var svgAsXML = (new XMLSerializer).serializeToString(svg);
    return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
}

function download() {
    var dl = document.createElement("a");
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute("href", svgDataURL(svg));
    dl.setAttribute("download", "Harta Somaj.svg");
    dl.click();
}
