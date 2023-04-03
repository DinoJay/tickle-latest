export default function hexToRgba(hex, opa) {
    // Remove the "#" character if it's present
    hex = hex.replace("#", "");

    // Convert the hex string to integers for each component (red, green, blue)
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    // Create the RGBA string with opacity 0.5
    const rgba = `rgba(${red}, ${green}, ${blue}, ${opa})`;

    return rgba;
}